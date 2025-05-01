import React, { useCallback, useEffect, useState } from "react";
import "./Form.css";
import { useTelegram } from "../../hooks/useTelegram";

const Form = () => {
  const [benName, setBenName] = useState("");
  const [managerName, setManagerName] = useState("");
  const [reprezentName, setReprezentName] = useState("");
  const [tehnicName, setTehnicName] = useState("");
  const [dirigName, setDirigName] = useState("");
  const [objectName, setObjectName] = useState("");
  const [personJurName, setPersonJurName] = useState("");
  const [antreprenorName, setAntreprenorName] = useState("");
  const [subantreprenorName, setSubantreprenorName] = useState("");
  const [installerName, setInstallerName] = useState("");
  const [floorCount, setFloorCount] = useState("");
  const [totalArea, setTotalArea] = useState("");
  const [objectAddress, setObjectAddress] = useState("");
  const [systemType, setSystemType] = useState([]);
  const [procelVerbalDataExam, setProcelVerbalDataExam] = useState("");
  const [cladInalt, setCladInalt] = useState("");
  const [tavanInalt, setTavanInalt] = useState("");
  const [projectId, setProjectId] = useState("");
  const [documentId, setDocumentId] = useState("");
  const [companyProject, setCompanyProject] = useState("");
  const [dataFinishObject, setDataFinishObject] = useState("");
  const [dataStartLucruCabl, setDataStartLucruCabl] = useState("");
  const [dataFinishLucruCabl, setDataFinishLucruCabl] = useState("");
  const [dataStartLucruMont, setDataStartLucruMont] = useState("");
  const [dataFinishLucruMont, setDataFinishLucruMont] = useState("");
  const { tg } = useTelegram();

  const onSendData = useCallback(() => {
    const data = {
      dirigName,
      managerName,
      benName,
      tehnicName,
      reprezentName,
      objectName,
      personJurName,
      antreprenorName,
      subantreprenorName,
      installerName,
      floorCount,
      totalArea,
      objectAddress,
      systemType,
      procelVerbalDataExam,
      cladInalt,
      tavanInalt,
      projectId,
      documentId,
      companyProject,
      dataFinishObject,
      dataStartLucruCabl,
      dataFinishLucruCabl,
      dataStartLucruMont,
      dataFinishLucruMont,
    };
    tg.sendData(JSON.stringify(data));
  }, [
    documentId,
    dirigName,
    managerName,
    tehnicName,
    benName,
    reprezentName,
    objectName,
    personJurName,
    antreprenorName,
    subantreprenorName,
    installerName,
    floorCount,
    totalArea,
    objectAddress,
    systemType,
    procelVerbalDataExam,
    cladInalt,
    tavanInalt,
    projectId,
    companyProject,
    dataFinishObject,
    dataStartLucruCabl,
    dataFinishLucruCabl,
    dataStartLucruMont,
    dataFinishLucruMont,
    tg,
  ]);

  useEffect(() => {
    tg.onEvent("mainButtonClicked", onSendData);
    return () => {
      tg.offEvent("mainButtonClicked", onSendData);
    };
  }, [onSendData, tg]);

  useEffect(() => {
    tg.MainButton.setParams({
      text: "Creare Document",
      color: "#0088cc",
    });
  }, [tg.MainButton]);

  useEffect(() => {
    if (
      !documentId ||
      !objectName ||
      !personJurName ||
      !antreprenorName ||
      !floorCount ||
      !totalArea ||
      !objectAddress ||
      systemType.length === 0 ||
      !projectId ||
      !companyProject ||
      !dataFinishObject ||
      !dataStartLucruCabl ||
      !dataFinishLucruCabl ||
      !dataStartLucruMont ||
      !dataFinishLucruMont
    ) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  }, [
    documentId,
    objectName,
    personJurName,
    antreprenorName,
    floorCount,
    totalArea,
    objectAddress,
    systemType,
    projectId,
    companyProject,
    dataFinishObject,
    dataStartLucruCabl,
    dataFinishLucruCabl,
    dataStartLucruMont,
    dataFinishLucruMont,
    tg.MainButton,
  ]);

  const handleSystemTypeChange = (e) => {
    const { value, checked } = e.target;
    if (checked && !systemType.includes(value)) {
      setSystemType((prev) => [...prev, value]);
    } else {
      setSystemType((prev) => prev.filter((type) => type !== value));
    }
  };

  return (
    <div className="form-container">
      <div className="form">
        <h3>Formular pentru Documente</h3>

        <div className="form-section">
          <div className="form-section-title">Informații Generale</div>
          <input
            className="input required"
            type="text"
            placeholder="Denumirea objectului"
            value={objectName}
            onChange={(e) => setObjectName(e.target.value)}
          />
          <input
            className="input required"
            type="text"
            placeholder="Denumirea persoanei juridice"
            value={personJurName}
            onChange={(e) => setPersonJurName(e.target.value)}
          />
          <input
            className="input required"
            type="text"
            placeholder="Nr. Document"
            value={documentId}
            onChange={(e) => setDocumentId(e.target.value)}
          />
          <input
            className="input required"
            type="text"
            placeholder="Nr. Proiectului"
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
          />
        </div>

        <div className="form-section">
          <div className="form-section-title">Informații despre Obiect</div>
          <input
            className="input required"
            type="text"
            placeholder="Adresa objectului"
            value={objectAddress}
            onChange={(e) => setObjectAddress(e.target.value)}
          />
          <input
            className="input required"
            type="number"
            placeholder="Număr etaje"
            value={floorCount}
            onChange={(e) => setFloorCount(e.target.value)}
          />
          <input
            className="input required"
            type="text"
            placeholder="Suprafața totală (m²)"
            value={totalArea}
            onChange={(e) => setTotalArea(e.target.value)}
          />
          <input
            className="input"
            type="text"
            placeholder="Înălțimea clădirii (m)"
            value={cladInalt}
            onChange={(e) => setCladInalt(e.target.value)}
          />
          <input
            className="input"
            type="text"
            placeholder="Înălțimea tavanului (m)"
            value={tavanInalt}
            onChange={(e) => setTavanInalt(e.target.value)}
          />
        </div>

        <div className="form-section">
          <div className="form-section-title">Companii și Reprezentanți</div>
          <input
            className="input required"
            type="text"
            placeholder="Denumirea antreprenorului"
            value={antreprenorName}
            onChange={(e) => setAntreprenorName(e.target.value)}
          />
          <input
            className="input"
            type="text"
            placeholder="Compania de proiectare"
            value={companyProject}
            onChange={(e) => setCompanyProject(e.target.value)}
          />
          <input
            className="input"
            type="text"
            placeholder="Denumirea subantreprenorului (opțional)"
            value={subantreprenorName}
            onChange={(e) => setSubantreprenorName(e.target.value)}
          />
          <input
            className="input"
            type="text"
            placeholder="Reprezentanții companiei de instalare (opțional)"
            value={installerName}
            onChange={(e) => setInstallerName(e.target.value)}
          />
        </div>

        <div className="form-section">
          <div className="form-section-title">Contacte</div>
          <input
            className="input"
            type="text"
            placeholder="Reprezentanții Beneficiarului (opțional)"
            value={benName}
            onChange={(e) => setBenName(e.target.value)}
          />
          <input
            className="input"
            type="text"
            placeholder="Reprezentanții Antreprenor General (opțional)"
            value={reprezentName}
            onChange={(e) => setReprezentName(e.target.value)}
          />
          <input
            className="input"
            type="text"
            placeholder="Manager de Proiect (opțional)"
            value={managerName}
            onChange={(e) => setManagerName(e.target.value)}
          />
          <input
            className="input"
            type="text"
            placeholder="Responsabil Tehnic (opțional)"
            value={tehnicName}
            onChange={(e) => setTehnicName(e.target.value)}
          />
          <input
            className="input"
            type="text"
            placeholder="Diriginte Șantier lucrări Specializate (opțional)"
            value={dirigName}
            onChange={(e) => setDirigName(e.target.value)}
          />
        </div>

        <div className="form-section">
          <div className="checkbox-group">
            <div className="checkbox-group-title">
              Selectați tipurile de sisteme:
            </div>
            <label>
              <input
                className="checkbox"
                type="checkbox"
                value="SEMNALIZAREA DE INCENDIU"
                checked={systemType.includes("SEMNALIZAREA DE INCENDIU")}
                onChange={handleSystemTypeChange}
              />
              🔥 Semnalizarea de Incendiu
            </label>
            <label>
              <input
                className="checkbox"
                type="checkbox"
                value="SISTEM AVERTIZARE"
                checked={systemType.includes("SISTEM AVERTIZARE")}
                onChange={handleSystemTypeChange}
              />
              📢 Sistem Avertizare
            </label>
            <label>
              <input
                className="checkbox"
                type="checkbox"
                value="SISTEM STINGERE"
                checked={systemType.includes("SISTEM STINGERE")}
                onChange={handleSystemTypeChange}
              />
              🚒 Sistem Stingere
            </label>
          </div>
        </div>

        <div className="form-section">
          <div className="form-section-title">Date Importante</div>
          <label className="date-label">
            Data Examinării Obiectului:
            <input
              type="date"
              value={procelVerbalDataExam}
              onChange={(e) => setProcelVerbalDataExam(e.target.value)}
            />
          </label>
          <label className="date-label">
            Data Începerii lucrărilor de Cablare:
            <input
              type="date"
              value={dataStartLucruCabl}
              onChange={(e) => setDataStartLucruCabl(e.target.value)}
            />
          </label>
          <label className="date-label">
            Data Finalizării lucrărilor de Cablare:
            <input
              type="date"
              value={dataFinishLucruCabl}
              onChange={(e) => setDataFinishLucruCabl(e.target.value)}
            />
          </label>
          <label className="date-label">
            Data Începerii lucrărilor de Montare:
            <input
              type="date"
              value={dataStartLucruMont}
              onChange={(e) => setDataStartLucruMont(e.target.value)}
            />
          </label>
          <label className="date-label">
            Data Finalizării lucrărilor de Montare:
            <input
              type="date"
              value={dataFinishLucruMont}
              onChange={(e) => setDataFinishLucruMont(e.target.value)}
            />
          </label>
          <label className="date-label">
            Data Finalizării lucrărilor de reglare și punere în funcțiune:
            <input
              type="date"
              value={dataFinishObject}
              onChange={(e) => setDataFinishObject(e.target.value)}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default Form;
