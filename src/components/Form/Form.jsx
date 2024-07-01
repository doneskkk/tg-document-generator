import React, { useCallback, useEffect, useState } from 'react';
import './Form.css';
import { useTelegram } from "../../hooks/useTelegram";

const Form = () => {
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
    const [companyProject, setCompanyProject] = useState('');
    const [dataFinishObject, setDataFinishObject] = useState('');
    const [dataStartLucruCabl, setDataStartLucruCabl] = useState('');
    const [dataFinishLucruCabl, setDataFinishLucruCabl] = useState('');
    const [dataStartLucruMont, setDataStartLucruMont] = useState('');
    const [dataFinishLucruMont, setDataFinishLucruMont] = useState('');
    const { tg } = useTelegram();

    const onSendData = useCallback(() => {
        const data = {
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
            companyProject,
            dataFinishObject,
            dataStartLucruCabl,
            dataFinishLucruCabl,
            dataStartLucruMont,
            dataFinishLucruMont,
        };
        tg.sendData(JSON.stringify(data));
    }, [objectName, personJurName, antreprenorName, subantreprenorName, floorCount, totalArea, objectAddress, systemType, procelVerbalDataExam, cladInalt, tavanInalt, projectId, companyProject, dataFinishObject, dataStartLucruCabl, dataFinishLucruCabl, dataStartLucruMont, dataFinishLucruMont, tg]);

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData);
        return () => {
            tg.offEvent('mainButtonClicked', onSendData);
        };
    }, [onSendData]);

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Сгенерировать документ'
        });
    }, []);

    useEffect(() => {
        if (!objectName || !personJurName || !antreprenorName || !floorCount || !totalArea || !objectAddress || systemType.length === 0 || !projectId || !companyProject || !dataFinishObject || !dataStartLucruCabl || !dataFinishLucruCabl || !dataStartLucruMont || !dataFinishLucruMont) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }, [objectName, personJurName, antreprenorName, floorCount, totalArea, objectAddress, systemType, projectId, companyProject, dataFinishObject, dataStartLucruCabl, dataFinishLucruCabl, dataStartLucruMont, dataFinishLucruMont]);

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
                <input className={'input'} type="text" placeholder={'Etaje'} value={floorCount} onChange={(e) => setFloorCount(e.target.value)} />
                <input className={'input'} type="text" placeholder={'Suprafata'} value={totalArea} onChange={(e) => setTotalArea(e.target.value)} />
                <input className={'input'} type="text" placeholder={'Adresa objectului'} value={objectAddress} onChange={(e) => setObjectAddress(e.target.value)} />
                <input className={'input'} type="text" placeholder={'Compania de proiectare'} value={companyProject} onChange={(e) => setCompanyProject(e.target.value)} />
                <input className={'input'} type="text" placeholder={'Inaltimea cladirii'} value={cladInalt} onChange={(e) => setCladInalt(e.target.value)} />
                <input className={'input'} type="text" placeholder={'Inaltimea tavantului'} value={tavanInalt} onChange={(e) => setTavanInalt(e.target.value)} />
                <input className={'input'} type="text" placeholder={'Nr. Proiectului'} value={projectId} onChange={(e) => setProjectId(e.target.value)} />

                <div className={'checkbox-group'}>
                    <label>
                        <input type="checkbox" value="SEMNALIZAREA DE INCENDIU"  checked={systemType.includes("SEMNALIZAREA DE INCENDIU")} onChange={handleSystemTypeChange} />
                        Система пожарной сигнализации
                    </label>
                    <label>
                        <input type="checkbox" value="SISTEM AVERTIZARE" checked={systemType.includes("SISTEM AVERTIZARE")} onChange={handleSystemTypeChange} />
                        Система сигнализации
                    </label>
                    <label>
                        <input type="checkbox" value="SISTEM STINGERE" checked={systemType.includes("SISTEM STINGERE")} onChange={handleSystemTypeChange} />
                        Система пожаротушения
                    </label>
                </div>

                <label className={'date-label'}> Дата словесного экзамена
                    <input className={'input'} type="date" value={procelVerbalDataExam} onChange={(e) => setProcelVerbalDataExam(e.target.value)} />
                </label>
                <label className={'date-label'}>Дата окончания объекта
                    <input className={'input'} type="date" value={dataFinishObject} onChange={(e) => setDataFinishObject(e.target.value)} />
                </label>
                <label className={'date-label'}>Дата начала кабельных работ:
                    <input className={'input'} type="date" value={dataStartLucruCabl} onChange={(e) => setDataStartLucruCabl(e.target.value)} />
                </label>
                <label className={'date-label'}>Дата окончания кабельных работ:
                    <input className={'input'} type="date" value={dataFinishLucruCabl} onChange={(e) => setDataFinishLucruCabl(e.target.value)} />
                </label>
                <label className={'date-label'}>Дата начала монтажных работ:
                    <input className={'input'} type="date" value={dataStartLucruMont} onChange={(e) => setDataStartLucruMont(e.target.value)} />
                </label>
                <label className={'date-label'}>Дата окончания монтажных работ:
                    <input className={'input'} type="date" value={dataFinishLucruMont} onChange={(e) => setDataFinishLucruMont(e.target.value)} />
                </label>
            </div>
        </div>
    );
};

export default Form;
