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
    const [fireSignalingSystem, setFireSignalingSystem] = useState(false);
    const [alarmSystem, setAlarmSystem] = useState(false);
    const [fireExtinguishingSystem, setFireExtinguishingSystem] = useState(false);
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
            systemType: {
                fireSignalingSystem,
                alarmSystem,
                fireExtinguishingSystem,
            },
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
    }, [objectName, personJurName, antreprenorName, subantreprenorName, floorCount, totalArea, objectAddress, systemType, fireSignalingSystem, alarmSystem, fireExtinguishingSystem, procelVerbalDataExam, cladInalt, tavanInalt, projectId, companyProject, dataFinishObject, dataStartLucruCabl, dataFinishLucruCabl, dataStartLucruMont, dataFinishLucruMont]);

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
        const { name, checked } = e.target;
        if (checked) {
            setSystemType((prev) => [...prev, name]);
        } else {
            setSystemType((prev) => prev.filter((type) => type !== name));
        }
    };

    return (
        <div>
            <div className={"form"}>
                <h3>Введите ваши данные</h3>
                <input className={'input'} type="text" placeholder={'Название объекта'} value={objectName} onChange={(e) => setObjectName(e.target.value)} />
                <input className={'input'} type="text" placeholder={'Юридическое имя'} value={personJurName} onChange={(e) => setPersonJurName(e.target.value)} />
                <input className={'input'} type="text" placeholder={'Имя предпринимателя'} value={antreprenorName} onChange={(e) => setAntreprenorName(e.target.value)} />
                <input className={'input'} type="text" placeholder={'Имя субподрядчика (необязательно)'} value={subantreprenorName} onChange={(e) => setSubantreprenorName(e.target.value)} />
                <input className={'input'} type="text" placeholder={'Количество этажей'} value={floorCount} onChange={(e) => setFloorCount(e.target.value)} />
                <input className={'input'} type="text" placeholder={'Общая площадь'} value={totalArea} onChange={(e) => setTotalArea(e.target.value)} />
                <input className={'input'} type="text" placeholder={'Адрес объекта'} value={objectAddress} onChange={(e) => setObjectAddress(e.target.value)} />

                <div className={'checkbox-group'}>
                    <label>
                        <input type="checkbox" name="fireSignalingSystem" checked={fireSignalingSystem} onChange={(e) => { setFireSignalingSystem(e.target.checked); handleSystemTypeChange(e); }} />
                        Система пожарной сигнализации
                    </label>
                    <label>
                        <input type="checkbox" name="alarmSystem" checked={alarmSystem} onChange={(e) => { setAlarmSystem(e.target.checked); handleSystemTypeChange(e); }} />
                        Система сигнализации
                    </label>
                    <label>
                        <input type="checkbox" name="fireExtinguishingSystem" checked={fireExtinguishingSystem} onChange={(e) => { setFireExtinguishingSystem(e.target.checked); handleSystemTypeChange(e); }} />
                        Система пожаротушения
                    </label>
                </div>

                <input className={'input'} type="text" placeholder={'Дата словесного экзамена'} value={procelVerbalDataExam} onChange={(e) => setProcelVerbalDataExam(e.target.value)} />
                <input className={'input'} type="text" placeholder={'Высота потолка'} value={cladInalt} onChange={(e) => setCladInalt(e.target.value)} />
                <input className={'input'} type="text" placeholder={'Высота тавана'} value={tavanInalt} onChange={(e) => setTavanInalt(e.target.value)} />
                <input className={'input'} type="text" placeholder={'ID проекта'} value={projectId} onChange={(e) => setProjectId(e.target.value)} />
                <input className={'input'} type="text" placeholder={'Название компании проекта'} value={companyProject} onChange={(e) => setCompanyProject(e.target.value)} />
                <input className={'input'} type="date" placeholder={'Дата окончания объекта'} value={dataFinishObject} onChange={(e) => setDataFinishObject(e.target.value)} />
                <input className={'input'} type="date" placeholder={'Дата начала кабельных работ'} value={dataStartLucruCabl} onChange={(e) => setDataStartLucruCabl(e.target.value)} />
                <input className={'input'} type="date" placeholder={'Дата окончания кабельных работ'} value={dataFinishLucruCabl} onChange={(e) => setDataFinishLucruCabl(e.target.value)} />
                <input className={'input'} type="date" placeholder={'Дата начала монтажных работ'} value={dataStartLucruMont} onChange={(e) => setDataStartLucruMont(e.target.value)} />
                <input className={'input'} type="date" placeholder={'Дата окончания монтажных работ'} value={dataFinishLucruMont} onChange={(e) => setDataFinishLucruMont(e.target.value)} />
            </div>
        </div>
    );
};

export default Form;
