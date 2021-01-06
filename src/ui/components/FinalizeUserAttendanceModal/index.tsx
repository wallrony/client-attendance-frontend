import React, { useEffect, useRef, useState } from 'react';
import Modal from 'antd/lib/modal/Modal';
import Commission from '../../../core/models/Commission';
import UserAttendance from '../../../core/models/UserAttendance';

import './styles.css';
import { formatDuration } from '../../../core/utils/GeneralUtils';
import { Divider } from 'antd';
import StorageController from '../../../data/static/StorageController';

interface FinalizeUserAttendancesModalProps {
  show: boolean;
  hide: () => void;
  attendance: UserAttendance | undefined;
  panic: (error: string) => boolean;
  onFinish: (data: Commission | undefined) => Promise<boolean>;
  initiateAttendance: (data: UserAttendance) => Promise<boolean>
}

const FinalizeUserAttendancesModal: React.FC<FinalizeUserAttendancesModalProps> = ({ attendance, show, hide, onFinish, initiateAttendance }) => {
  const [attInProgress, setAttInProgress] = useState<boolean>(false);
  const [attFinalized, setAttFinalized] = useState<boolean>(false);
  const [secondsCounter, setSecondsCounter] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    function setUpCounter() {
      timerRef.current = setInterval(() => {
        setSecondsCounter((count) => {
          if(count + 1 === getTotalDuration()) {
            unsetCounter();

            finalizeAttendance();
          }

          return count + 1;
        })
      }, 1000);
    }

    function unsetCounter() {
      if(timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    if(attInProgress) {
      if(!timerRef.current) {
        setUpCounter();
      }
    } else {
      unsetCounter();
    }

    // eslint-disable-next-line
  }, [attInProgress])

  function getCommission(): Commission | undefined {
    let data: Commission | undefined = { } as Commission;

    if(attendance && attendance.id && attendance.services) {
      data.client_attendance_id = attendance.id;
      data.doctor_id = Number(StorageController.getDoctorID());

      data.value = calcTotalValue();
    }

    return data;
  }

  function calcTotalValue() {
    let result = 0;

    if(attendance && attendance.services) {
      for(const service of attendance.services) {
        result += (service.price * 95) / 100;
      }
    }

    return result;
  }

  function getTotalDuration() {
    let result = 0;

    if(attendance && attendance.services) {
      for(const service of attendance.services) {
        result += Number(service.duration);
      }
    }

    return result;
  }

  function verifyBeforeHide() {
    if(attInProgress) {
      const cancel = window.confirm('Há um atendimento em andamento. Você deseja cancelar mesmo assim?');

      if(cancel) {
        hide();
      }
    } else {
      setAttInProgress(false);
      setAttFinalized(false);
      setSecondsCounter(0);

      hide();
    }
  }

  async function handleModalOk() {
    if(attInProgress) {
      setAttInProgress(false);

      const canContinue = await onFinish(getCommission());

      if(canContinue) {
        setAttFinalized(true);
      }
    } else {
      const att: UserAttendance | undefined = attendance;

      if(att) {
        att['status'] = 'in-progress';

        const canContinue = await initiateAttendance(att);

        if(canContinue) {
          setAttInProgress(true);

          window.onclose = () => window.confirm(
            'Um atendimento está em andamento. Você deseja mesmo fechar esta página?'
          );
        }
      }
    }
  }

  function finalizeAttendance() {
    setAttInProgress(false);
    setAttFinalized(true);
    
    handleModalOk();
  }

  window.onbeforeunload = (ev: BeforeUnloadEvent) =>  {
    const message: string = 'Um atendimento está em andamento. Você deseja mesmo fechar esta página?';

    ev.returnValue = message;

    return message;
  }

  const timePercent = secondsCounter / getTotalDuration() * 100;

  return (
    <Modal
      className={`modal-finalize-commission${attFinalized ? ' finalized' : ''}`}
      title="Realizar Atendimento"
      visible={show}
      closable={!attInProgress}
      cancelText="Cancelar"
      cancelButtonProps={{
        className: 'cancel-btn'
      }}
      okText={
        attInProgress ? 'Finalizar' : 'Iniciar'
      }
      onOk={() => handleModalOk()}
      onCancel={() => verifyBeforeHide()}
      destroyOnClose
    >
      <div className="attendance-item">
        <p className="title">{attendance ? attendance['title'] ? attendance['title'] : '' : ''}</p>

        <p className="value">Valor Total de Comissão: R${calcTotalValue()}</p>
        <p className="duration">Duração: {formatDuration(getTotalDuration())}</p>

        <Divider dashed style={{borderTopWidth: 2}} />

        <p className="services-title">Serviços</p>
        <ul className="services-list">
          {attendance?.services?.map(
            (item, index) => <li key={`${item.id}-${item.name}`}>{index + 1} - {item.name};</li>
          )}
        </ul>

        {
          attInProgress ? 
            <>
              <div className="counter">
                Tempo: {formatDuration(secondsCounter).replaceAll('.', '')}
              </div>
              <div className="timer-progress" style={{width: '100%'}}>
                <div className="progress" style={{width: `${timePercent > 100 ? 100 : timePercent}%`}}></div>
                <p>{Math.ceil(timePercent)}%</p>
              </div>
            </>
            : attFinalized ?
              <div className="attendance-finalized-status">
                <p>O tempo do atendimento acabou!</p>

                <p>Todos os dados foram salvos! Pode fechar a janela sem problemas.</p>
              </div>
              : null
        }
      </div>
    </Modal>
  );
}

export default FinalizeUserAttendancesModal;
