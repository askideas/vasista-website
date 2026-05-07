import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, ArrowRight, Loader, ShieldCheck, Plus, Trash2, CheckCircle } from 'lucide-react';
import logo from '../assets/logo-vasista.png';
import './OnboardingForm.css';

const OnboardingForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    qualification: '',
    experience: '',
    skills: ''
  });
  
  const [guardians, setGuardians] = useState([{ relation: 'Father', name: '', phone: '' }]);
  const [aadharNumber, setAadharNumber] = useState('');
  
  const [aadharFrontBlob, setAadharFrontBlob] = useState(null);
  const [aadharFrontPreview, setAadharFrontPreview] = useState(null);
  const [aadharBackBlob, setAadharBackBlob] = useState(null);
  const [aadharBackPreview, setAadharBackPreview] = useState(null);

  const [photoBlob, setPhotoBlob] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  const fileInputRef = useRef(null);
  const aadharFrontRef = useRef(null);
  const aadharBackRef = useRef(null);
  
  useEffect(() => {
    try {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const userObj = JSON.parse(userStr);
        if (userObj.phone) {
          setFormData(prev => ({ ...prev, phone: userObj.phone }));
        }
      }
    } catch(e) {}
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGuardianChange = (index, field, value) => {
    const newGuardians = [...guardians];
    newGuardians[index][field] = value;
    setGuardians(newGuardians);
  };

  const addGuardian = () => {
    setGuardians([...guardians, { relation: 'Mother', name: '', phone: '' }]);
  };

  const removeGuardian = (index) => {
    if (guardians.length > 1) {
      setGuardians(guardians.filter((_, i) => i !== index));
    }
  };

  const processImage = (file, setBlob, setPreview) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) { height *= MAX_WIDTH / width; width = MAX_WIDTH; }
        } else {
          if (height > MAX_HEIGHT) { width *= MAX_HEIGHT / height; height = MAX_HEIGHT; }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            setBlob(blob);
            setPreview(URL.createObjectURL(blob));
          },
          'image/jpeg',
          0.7
        );
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handlePhotoChange = (e) => {
    processImage(e.target.files[0], setPhotoBlob, setPhotoPreview);
  };

  const handleAadharPhotoChange = (e, side) => {
    if (side === 'front') {
      processImage(e.target.files[0], setAadharFrontBlob, setAadharFrontPreview);
    } else {
      processImage(e.target.files[0], setAadharBackBlob, setAadharBackPreview);
    }
  };

  const uploadToImageKit = async (blob, prefix) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          const base64data = reader.result;
          const sessionToken = localStorage.getItem('sessionToken');
          
          const response = await fetch('http://localhost:3000/api/upload', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${sessionToken}`
            },
            body: JSON.stringify({
              imageBase64: base64data,
              fileName: `${prefix}_${Date.now()}.jpg`
            })
          });

          if (!response.ok) {
            const errData = await response.json();
            throw new Error(errData.message || 'Image upload failed');
          }

          const data = await response.json();
          resolve(data.url);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = () => reject(new Error('Failed to read image blob'));
      reader.readAsDataURL(blob);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName) {
      setErrorMsg('First Name and Last Name are required.');
      return;
    }
    if (!formData.qualification || formData.experience === '') {
      setErrorMsg('Qualification and Experience are required.');
      return;
    }
    if (!guardians[0].name || !guardians[0].phone) {
      setErrorMsg('At least one Guardian contact is required.');
      return;
    }
    if (!aadharNumber || !aadharFrontBlob || !aadharBackBlob) {
      setErrorMsg('Please enter your Aadhar number and upload both front and back photos.');
      return;
    }
    
    setLoading(true);
    setErrorMsg('');
    try {
      let photoUrl = '';
      if (photoBlob) {
        photoUrl = await uploadToImageKit(photoBlob, 'profile');
      }

      const aadharFrontUrl = await uploadToImageKit(aadharFrontBlob, 'aadhar_front');
      const aadharBackUrl = await uploadToImageKit(aadharBackBlob, 'aadhar_back');

      const dbId = JSON.parse(localStorage.getItem('user'))?.dbId;
      const sessionToken = localStorage.getItem('sessionToken');
      
      const payload = {
        ...formData,
        guardians,
        aadharNumber,
        aadharFrontUrl,
        aadharBackUrl,
        kycStatus: 'Pending',
        candidateStatus: 'Open to work',
        profilePhoto: photoUrl
      };

      const response = await fetch(`http://localhost:3000/api/candidates/${dbId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionToken}`
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Failed to save details');
      }
      
      const updatedData = await response.json();
      const oldUser = JSON.parse(localStorage.getItem('user'));
      localStorage.setItem('user', JSON.stringify({ ...oldUser, ...payload }));
      
      onSuccess();
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ob-root">
      <div className="ob-container">
        
        {/* Header Section */}
        <div className="ob-header">
          <img src={logo} alt="Vasista" className="ob-logo" />
          <h1 className="ob-title">Complete Your Profile</h1>
          <p className="ob-sub">We need a few details to get you onboarded.</p>
        </div>

        {errorMsg && <div className="ob-error">{errorMsg}</div>}

        <form onSubmit={handleSubmit} className="ob-form">
          
          {/* ── SECTION 1: BASIC INFO ── */}
          <div className="ob-section">
            <div className="ob-sec-header">
              <h2 className="ob-sec-title">Basic Info</h2>
              <p className="ob-sec-desc">Enter your primary personal details.</p>
            </div>
            
            <div className="ob-basic-layout">
              <div className="ob-photo-side">
                <div 
                  className="ob-photo-circle" 
                  onClick={() => fileInputRef.current?.click()}
                  style={{ backgroundImage: photoPreview ? `url(${photoPreview})` : 'none' }}
                >
                  {!photoPreview && <Camera size={24} />}
                </div>
                <p>Profile Photo</p>
                <input type="file" accept="image/*" ref={fileInputRef} style={{ display: 'none' }} onChange={handlePhotoChange} />
              </div>

              <div className="ob-grid">
                <div className="ob-group">
                  <label>First Name *</label>
                  <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required placeholder="John" />
                </div>
                <div className="ob-group">
                  <label>Last Name *</label>
                  <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required placeholder="Doe" />
                </div>
                <div className="ob-group">
                  <label>Mobile Number</label>
                  <input type="text" name="phone" value={formData.phone} disabled className="ob-disabled" />
                </div>
                <div className="ob-group">
                  <label>Email ID (Optional)</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="johndoe@example.com" />
                </div>
              </div>
            </div>
          </div>

          {/* ── SECTION 2: QUALIFICATION ── */}
          <div className="ob-section">
            <div className="ob-sec-header">
              <h2 className="ob-sec-title">Qualification & Skills</h2>
              <p className="ob-sec-desc">Tell us about your education and experience.</p>
            </div>
            
            <div className="ob-grid">
              <div className="ob-group">
                <label>Qualification *</label>
                <input type="text" name="qualification" value={formData.qualification} onChange={handleChange} required placeholder="e.g. B.Tech, SSC, Intermediate" />
              </div>
              <div className="ob-group">
                <label>Experience (in years) *</label>
                <input type="number" name="experience" min="0" value={formData.experience} onChange={handleChange} required placeholder="e.g. 2" />
              </div>
              <div className="ob-group ob-address-full">
                <label>Skills</label>
                <input type="text" name="skills" value={formData.skills} onChange={handleChange} placeholder="e.g. Plumbing, Carpentry, Customer Service (Comma separated)" />
              </div>
            </div>
          </div>

          {/* ── SECTION 3: GUARDIAN DETAILS ── */}
          <div className="ob-section">
            <div className="ob-sec-header">
              <h2 className="ob-sec-title">Guardian Contacts</h2>
              <p className="ob-sec-desc">Please add at least one emergency contact.</p>
            </div>
            
            {guardians.map((g, index) => (
              <div key={index} className="ob-guardian-row">
                <div className="ob-group" style={{ flex: '1' }}>
                  <label>Relation</label>
                  <select value={g.relation} onChange={(e) => handleGuardianChange(index, 'relation', e.target.value)}>
                    <option value="Father">Father</option>
                    <option value="Mother">Mother</option>
                    <option value="Spouse">Spouse</option>
                    <option value="Brother">Brother</option>
                    <option value="Sister">Sister</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="ob-group" style={{ flex: '2' }}>
                  <label>Name *</label>
                  <input type="text" value={g.name} onChange={(e) => handleGuardianChange(index, 'name', e.target.value)} required={index === 0} placeholder="Guardian's Name" />
                </div>
                <div className="ob-group" style={{ flex: '1.5' }}>
                  <label>Mobile Number *</label>
                  <input type="text" maxLength={10} value={g.phone} onChange={(e) => handleGuardianChange(index, 'phone', e.target.value)} required={index === 0} placeholder="e.g. 9876543210" />
                </div>
                {guardians.length > 1 && (
                  <button type="button" className="ob-remove-icon-btn" onClick={() => removeGuardian(index)} title="Remove Contact">
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
            ))}
            <button type="button" className="ob-add-btn" onClick={addGuardian}>
              <Plus size={16} /> Add Another Contact
            </button>
          </div>

          {/* ── SECTION 3: KYC ── */}
          <div className="ob-section">
            <div className="ob-sec-header">
              <h2 className="ob-sec-title">KYC Verification</h2>
              <p className="ob-sec-desc">Verify your Aadhar by uploading the document.</p>
            </div>
            
            <div className="ob-kyc-layout">
              <div className="ob-group" style={{ flex: '1', marginBottom: '1rem' }}>
                <label>Aadhar Number *</label>
                <input 
                  type="text" 
                  maxLength={12} 
                  value={aadharNumber} 
                  onChange={(e) => setAadharNumber(e.target.value.replace(/\D/g, ''))} 
                  placeholder="Enter 12-digit Aadhar"
                  required 
                />
              </div>

              <div className="ob-grid">
                <div className="ob-doc-upload">
                  <p className="ob-doc-title">Aadhar Front *</p>
                  <div 
                    className="ob-doc-box" 
                    onClick={() => aadharFrontRef.current?.click()}
                    style={{ backgroundImage: aadharFrontPreview ? `url(${aadharFrontPreview})` : 'none' }}
                  >
                    {!aadharFrontPreview && <Camera size={24} />}
                  </div>
                  <input type="file" accept="image/*" ref={aadharFrontRef} style={{ display: 'none' }} onChange={(e) => handleAadharPhotoChange(e, 'front')} />
                </div>

                <div className="ob-doc-upload">
                  <p className="ob-doc-title">Aadhar Back *</p>
                  <div 
                    className="ob-doc-box" 
                    onClick={() => aadharBackRef.current?.click()}
                    style={{ backgroundImage: aadharBackPreview ? `url(${aadharBackPreview})` : 'none' }}
                  >
                    {!aadharBackPreview && <Camera size={24} />}
                  </div>
                  <input type="file" accept="image/*" ref={aadharBackRef} style={{ display: 'none' }} onChange={(e) => handleAadharPhotoChange(e, 'back')} />
                </div>
              </div>
            </div>
          </div>

          {/* ── SECTION 4: ADDRESS ── */}
          <div className="ob-section" style={{ borderBottom: 'none' }}>
            <div className="ob-sec-header">
              <h2 className="ob-sec-title">Address</h2>
              <p className="ob-sec-desc">Where are you currently located?</p>
            </div>
            
            <div className="ob-address-grid">
              <div className="ob-group ob-address-full">
                <label>Street Address</label>
                <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="House No, Street, Landmark" />
              </div>
              <div className="ob-group">
                <label>City</label>
                <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="e.g. Hyderabad" />
              </div>
              <div className="ob-group">
                <label>State</label>
                <input type="text" name="state" value={formData.state} onChange={handleChange} placeholder="e.g. Telangana" />
              </div>
            </div>
          </div>

          <div className="ob-footer">
            <button type="submit" className="ob-submit-btn" disabled={loading}>
              {loading ? <><Loader className="spin" size={18} /> Saving...</> : <>Complete Setup <ArrowRight size={18} /></>}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default OnboardingForm;
