import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Upload, Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // ✅ Import useNavigate

const CompanyInfoForm = () => {
  const navigate = useNavigate(); // ✅ Créer navigate
  const [formData, setFormData] = useState({
    companyName: '',
    NameProprietaire: '',
    businessLicense: '',
    companyLocation: '',
    email: '',
    modePass: ''
  });

  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const fileInputRef = useRef(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setLogoPreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => fileInputRef.current?.click();

  const handleSubmit = async () => {
    if (!formData.companyName || !formData.NameProprietaire || !formData.businessLicense || 
        !formData.companyLocation || !formData.email || !formData.modePass) {
      setError("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    try {
      setError(""); 
      setSuccess("");

      const data = new FormData();
      Object.keys(formData).forEach(key => data.append(key, formData[key]));
      if (logoFile) data.append("logo", logoFile);

      const res = await axios.post(
        "http://localhost:5000/api/companies",
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setSuccess(res.data.message);
      console.log("Company info:", res.data.company);

      // Reset form
      setFormData({
        companyName: '',
        NameProprietaire: '',
        businessLicense: '',
        companyLocation: '',
        email: '',
        modePass: ''
      });
      setLogoFile(null);
      setLogoPreview(null);
      fileInputRef.current.value = null;

      // ✅ Navigate automatically to AutoLoc Premium Dashboard
      navigate("/auto-loc-premium-dashboard");

    } catch (err) {
      setError(err.response?.data?.message || "Erreur inconnue");
      console.error(err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-lg">
      {error && <p className="text-red-600 mb-2">{error}</p>}
      {success && <p className="text-green-600 mb-2">{success}</p>}

      <div className="space-y-8">
        <div className="bg-gray-50 p-6 rounded-lg shadow">
          <div className="flex items-center gap-2 mb-6">
            <Building2 className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-800">Company Information</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company Logo *</label>
              <div 
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 transition-colors"
                onClick={triggerFileInput}
              >
                {logoPreview ? (
                  <img src={logoPreview} alt="Logo preview" className="w-20 h-20 mx-auto object-contain" />
                ) : (
                  <div className="flex flex-col items-center">
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">Upload Company Logo</p>
                  </div>
                )}
                <input 
                  ref={fileInputRef} 
                  type="file" 
                  accept=".png,.jpg,.jpeg,.svg" 
                  onChange={handleLogoUpload} 
                  className="hidden" 
                />
              </div>
            </div>

            <div className="space-y-4">
              <input type="text" name="companyName" value={formData.companyName} onChange={handleInputChange} placeholder="Company Name" className="w-full px-3 py-2 border rounded" />
              <input type="text" name="NameProprietaire" value={formData.NameProprietaire} onChange={handleInputChange} placeholder="Name Proprietaire" className="w-full px-3 py-2 border rounded" />
              <input type="text" name="businessLicense" value={formData.businessLicense} onChange={handleInputChange} placeholder="Business License" className="w-full px-3 py-2 border rounded" />
              <input type="text" name="companyLocation" value={formData.companyLocation} onChange={handleInputChange} placeholder="Company Location" className="w-full px-3 py-2 border rounded" />
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" className="w-full px-3 py-2 border rounded" />
              <input type="password" name="modePass" value={formData.modePass} onChange={handleInputChange} placeholder="Password" className="w-full px-3 py-2 border rounded" />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button onClick={handleSubmit} className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">Save Company Information</button>
        </div>
      </div>
    </div>
  );
};

export default CompanyInfoForm;
