import React, { useState, useEffect } from "react";

// Base styles for the component
const alertMessage = {
  marginTop: "5px",
};

const highlight = {
  border: "2px solid red",
  backgroundColor: "red",
};

const centerContainerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "50vh",
  textAlign: "center",
};

const addSkillButtonStyle = {
  backgroundColor: "#525252",
  border: "1px solid #333",
  color: "white",
  borderRadius: "5px",
  marginLeft: "10px",
  cursor: "pointer",
};

const formBoxStyle = {
  border: "1px solid #ccc",
  padding: "20px",
  backgroundColor: "#f5f5f5",
};

const formGroupStyle = {
  marginBottom: "10px",
  display: "flex",
  alignItems: "center",
};

const sharpEdgeButtonStyle = {
  backgroundColor: "#525252",
  border: "1px solid #333",
  padding: "10px 20px",
  color: "white",
  borderRadius: "5px",
  cursor: "pointer",
  marginTop: "10px",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  boxSizing: "border-box",
};

const skillTagStyle = {
  backgroundColor: "#333",
  color: "white",
  borderRadius: "0",
  padding: "5px 10px",
  margin: "0 5px",
};

const buttonGroupStyle = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "10px",
};

function CandidateRegistration() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    skill: "",
    skills: [],
  });

  const [registrationStatus, setRegistrationStatus] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const highlightInput = true;

  const handleAddSkill = () => {
    // Hint: Implement this
    let skilled = formData.skills;
    if (formData.skill) {
      if (skilled.length < 5) {
        skilled.push(formData.skill);
        setFormData({ ...formData, skills: skilled, skill: "" });
      } else {
        setFormData({ ...formData, skill: "" });
      }
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formData.skills.length > 0) {
      const data = candidates.find(
        (candidate) => candidate.email === formData.email
      );
      if (data) {
        //console.log("data exists");
        setFormData({
          name: "",
          email: "",
          role: "",
          skill: "",
          skills: [],
        });
        setRegistrationStatus(2);
      } else {
        setCandidates((prev) => [...prev, formData]);
        setFormData({
          name: "",
          email: "",
          role: "",
          skill: "",
          skills: [],
        });
        setRegistrationStatus(1);
      }
    }
    // Hint: Implement this
  };

  const handleReset = () => {
    // Hint: Implement this
    setFormData({ name: "", email: "", role: "", skill: "", skills: [] });
  };

  useEffect(() => {
    const storedCandidates = localStorage.getItem("candidates");
    if (storedCandidates) {
      let jsons = JSON.parse(storedCandidates);
      setCandidates(jsons);
      // Hint: Implement this
    }
  }, []);
  useEffect(() => {
    if (candidates.length !== 0) {
      localStorage.setItem("candidates", JSON.stringify(candidates));
    }

    //console.log(candidates);
  }, [candidates]);

  return (
    <div style={centerContainerStyle}>
      <div style={formBoxStyle}>
        <div data-testid="registration-component" style={formBoxStyle}>
          <form onSubmit={handleFormSubmit}>
            <div className="form-group" style={formGroupStyle}>
              <input
                type="text"
                name="name"
                value={formData.name}
                placeholder="Name"
                required
                style={inputStyle}
                data-testid="form-input-name"
                onChange={(e) => {
                  registrationStatus && setRegistrationStatus(null);
                  setFormData({ ...formData, name: e.target.value });
                }}
                // onChange={() => {}} - Hint: Implement this
              />
            </div>
            <div className="form-group" style={formGroupStyle}>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) => {
                  registrationStatus && setRegistrationStatus(null);
                  setFormData({ ...formData, email: e.target.value });
                }}
                // onChange={() => {}} - Hint: Implement this
                placeholder="Email"
                data-testid="form-input-name"
                required
                style={{ ...inputStyle, ...(highlightInput ? highlight : {}) }}
              />
            </div>
            <div className="form-group" style={formGroupStyle}>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={(e) => {
                  registrationStatus && setRegistrationStatus(null);
                  setFormData({ ...formData, role: e.target.value });
                }}
                // onChange={() => {}} - Hint: Implement this
                placeholder="Role"
                required
                style={inputStyle}
              />
            </div>
            <div className="form-group" style={formGroupStyle}>
              <input
                data-testid="form-input-skill"
                type="text"
                name="skill"
                value={formData.skill}
                placeholder="Skill"
                style={inputStyle}
                onChange={(e) => {
                  registrationStatus && setRegistrationStatus(null);
                  setFormData({ ...formData, skill: e.target.value });
                }}
              />
              <button
                type="button"
                data-testid="add-btn"
                style={addSkillButtonStyle}
                onClick={() => handleAddSkill()}
              >
                Add Skill
              </button>
            </div>
            <div>
              {formData.skills.map((skill, index) => (
                <span
                  key={index + skill}
                  data-testid="skill-tag"
                  style={skillTagStyle}
                >
                  {skill}
                </span>
              ))}
            </div>
            <div style={buttonGroupStyle}>
              <button
                data-testid="submit-btn"
                type="submit"
                style={sharpEdgeButtonStyle}
                disabled={formData.skills.length === 0}
              >
                Register
              </button>
              <button
                data-testid="reset-btn"
                type="button"
                style={sharpEdgeButtonStyle}
                onClick={handleReset}
              >
                Reset
              </button>
            </div>
          </form>
          {registrationStatus &&
          // Hint: Implement this
          registrationStatus === 1 ? (
            <div style={alertMessage}>Candidate profile created</div>
          ) : registrationStatus === 2 ? (
            <div style={alertMessage}>Email already exists</div>
          ) : null}
          {/* //console.log(registrationStatus)} */}
        </div>
      </div>
    </div>
  );
}

export default CandidateRegistration;
