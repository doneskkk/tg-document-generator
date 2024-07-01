import React, { useCallback, useEffect, useState } from 'react';
import './Form.css';
import { useTelegram } from "../../hooks/useTelegram";

const Form = () => {
    const [benName, setBenName] = useState('')
    const [managerName, setManagerName] = useState('')
    const [reprezentName, setReprezentName] = useState('')
    const [tehnicName, setTehnicName] = useState('')
    const [dirigName, setDirigName] = useState('')
    const [objectName, setObjectName] = useState('')
    const [personJurName, setPersonJurName] = useState('');
    const [antreprenorName, setAntreprenorName] = useState('');
    const [subantreprenorName, setSubantreprenorName] = useState('');
    const [floorCount, setFloorCount] = useState('');
    const [totalArea, setTotalArea] = useState('');
    const [objectAddress, setObjectAddress] = useState('');
    const [systemType, setSystemType] = useState([]);
    const [procelVerbalDataExam, setProcelVerbalDataExam] = useState('');
    const [cladInalt, setCladInalt] = useState('');
    const [tavanInalt, setTavanInalt] = useState('');
    const [projectId, setProjectId] = useState('');
    const [documentId, setDocumentId] = useState('');
    const [companyProject, setCompanyProject] = useState('');
    const [dataFinishObject, setDataFinishObject] = useState('');
    const [dataStartLucruCabl, setDataStartLucruCabl] = useState('');
    const [dataFinishLucruCabl, setDataFinishLucruCabl] = useState('');
    const [dataStartLucruMont, setDataStartLucruMont] = useState('');
    const [dataFinishLucruMont, setDataFinishLucruMont] = useState('');
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
    }, [documentId, dirigName, managerName,tehnicName,benName, objectName, personJurName, antreprenorName, subantreprenorName, floorCount, totalArea, objectAddress, systemType, procelVerbalDataExam, cladInalt, tavanInalt, projectId, companyProject, dataFinishObject, dataStartLucruCabl, dataFinishLucruCabl, dataStartLucruMont, dataFinishLucruMont, tg]);

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData);
        return () => {
            tg.offEvent('mainButtonClicked', onSendData);
        };
    }, [onSendData]);

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Create'
        });
    }, []);

    useEffect(() => {
        if (!documentId  || !objectName || !personJurName || !antreprenorName || !floorCount || !totalArea || !objectAddress || systemType.length === 0 || !projectId || !companyProject || !dataFinishObject || !dataStartLucruCabl || !dataFinishLucruCabl || !dataStartLucruMont || !dataFinishLucruMont) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }, [documentId, objectName, personJurName, antreprenorName, floorCount, totalArea, objectAddress, systemType, projectId, companyProject, dataFinishObject, dataStartLucruCabl, dataFinishLucruCabl, dataStartLucruMont, dataFinishLucruMont]);

    const handleSystemTypeChange = (e) => {
        const { value, checked } = e.target;
        if (checked && !systemType.includes(value)) {
            setSystemType((prev) => [...prev, value]);
        } else {
            setSystemType((prev) => prev.filter((type) => type !== value));
        }
    };


    return (
        <div className={"form-container"}>
            <div className={"form"}>
                <h3>Введите ваши данные</h3>
                <input className={'input'} type="text" placeholder={'Denumirea objectului'} value={objectName} onChange={(e) => setObjectName(e.target.value)} />
                <input className={'input'} type="text" placeholder={'Denumirea persoanei juridice'} value={personJurName} onChange={(e) => setPersonJurName(e.target.value)} />
                <input className={'input'} type="text" placeholder={'Denumirea antreprenorului'} value={antreprenorName} onChange={(e) => setAntreprenorName(e.target.value)} />
                <input className={'input'} type="text" placeholder={'Denumirea subantreprenorului (optional)'} value={subantreprenorName} onChange={(e) => setSubantreprenorName(e.target.value)} />
                <input className={'input'} type="text" placeholder={'Reprezentanții Beneficiarului (optional)'} value={benName} onChange={(e) => setBenName(e.target.value)} />
                <input className={'input'} type="text" placeholder={'Reprezentanții Antreprenor General (optional)'} value={reprezentName} onChange={(e) => setReprezentName(e.target.value)} />
                <input className={'input'} type="text" placeholder={'Manager de Proiect (optional)'} value={managerName} onChange={(e) => setManagerName(e.target.value)} />
                <input className={'input'} type="text" placeholder={'Responsabil Tehnic (optional)'} value={tehnicName} onChange={(e) => setTehnicName(e.target.value)} />
                <input className={'input'} type="text" placeholder={'Reprezentanții companiei de instalare, pornire și reglare (optional)'} value={subantreprenorName} onChange={(e) => setSubantreprenorName(e.target.value)} />
                <input className={'input'} type="text" placeholder={'Diriginte Șantier lucrări Specializate  (optional)'} value={dirigName} onChange={(e) => setDirigName(e.target.value)} />
                <input className={'input'} type="text" placeholder={'Etaje'} value={floorCount} onChange={(e) => setFloorCount(e.target.value)} />
                <input className={'input'} type="text" placeholder={'Suprafata'} value={totalArea} onChange={(e) => setTotalArea(e.target.value)} />
                <input className={'input'} type="text" placeholder={'Adresa objectului'} value={objectAddress} onChange={(e) => setObjectAddress(e.target.value)} />
                <input className={'input'} type="text" placeholder={'Compania de proiectare'} value={companyProject} onChange={(e) => setCompanyProject(e.target.value)} />
                <input className={'input'} type="text" placeholder={'Inaltimea cladirii'} value={cladInalt} onChange={(e) => setCladInalt(e.target.value)} />
                <input className={'input'} type="text" placeholder={'Inaltimea tavantului'} value={tavanInalt} onChange={(e) => setTavanInalt(e.target.value)} />
                <input className={'input'} type="text" placeholder={'Nr. Proiectului'} value={projectId} onChange={(e) => setProjectId(e.target.value)} />
                <input className={'input'} type="text" placeholder={'Nr. Document.'} value={documentId} onChange={(e) => setDocumentId(e.target.value)} />

                <div className={'checkbox-group'}>
                    <label>
                        <input className={'checkbox'} type="checkbox" value="SEMNALIZAREA DE INCENDIU"  checked={systemType.includes("SEMNALIZAREA DE INCENDIU")} onChange={handleSystemTypeChange} />
                        🔥SEMNALIZAREA DE INCENDIU
                    </label>
                    <label>
                        <input className={'checkbox'} type="checkbox" value="SISTEM AVERTIZARE" checked={systemType.includes("SISTEM AVERTIZARE")} onChange={handleSystemTypeChange} />
                        📢SISTEM AVERTIZARE
                    </label>
                    <label>
                        <input className={'checkbox'} type="checkbox" value="SISTEM STINGERE" checked={systemType.includes("SISTEM STINGERE")} onChange={handleSystemTypeChange} />
                        🚒SISTEM STINGERE
                    </label>
                </div>

                <label className={'date-label'}> Data Examinarii Obiectului
                    <input className={'input'} type="date" value={procelVerbalDataExam} onChange={(e) => setProcelVerbalDataExam(e.target.value)} />
                </label>
                <label className={'date-label'}>Data Inceperii lucrarilor de Cablare
                    <input className={'input'} type="date" value={dataStartLucruCabl} onChange={(e) => setDataStartLucruCabl(e.target.value)} />
                </label>
                <label className={'date-label'}>Data Finisarii lucrarilor de Cablare
                    <input className={'input'} type="date" value={dataFinishLucruCabl} onChange={(e) => setDataFinishLucruCabl(e.target.value)} />
                </label>
                <label className={'date-label'}>Data Inceperii lucrarilor de Montare
                    <input className={'input'} type="date" value={dataStartLucruMont} onChange={(e) => setDataStartLucruMont(e.target.value)} />
                </label>
                <label className={'date-label'}>Data Finisarii lucrarilor de Montare
                    <input className={'input'} type="date" value={dataFinishLucruMont} onChange={(e) => setDataFinishLucruMont(e.target.value)} />
                </label>
                <label className={'date-label'}>Lucrarilor de reglare si punere in functiune a sistemelor
                    <input className={'input'} type="date" value={dataFinishObject} onChange={(e) => setDataFinishObject(e.target.value)} />
                </label>
            </div>
        </div>
    );
};

export default Form;
