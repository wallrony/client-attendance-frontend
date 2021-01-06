import React from 'react';
import Modal from 'antd/lib/modal/Modal';
import Commission from '../../../core/models/Commission';
import UserAttendance from '../../../core/models/UserAttendance';
import StorageController from '../../../data/static/StorageController';

interface FinalizeUserAttendancesModalProps {
  show: boolean;
  hide: () => void;
  attendance: UserAttendance | undefined;
  panic: (error: string) => boolean;
  onFinish: (data: Commission | undefined) => void;
}

const FinalizeUserAttendancesModal: React.FC<FinalizeUserAttendancesModalProps> = ({ attendance, show, hide, onFinish }) => {
  function getCommission(): Commission | undefined {
    let data: Commission | undefined = { } as Commission;

    if(attendance && attendance.id && attendance.services) {
      data.client_attendance_id = attendance.id;
      data.doctor_id = Number(StorageController.getDoctorID());

      data.value = 0;

      for(const service of attendance.services) {
        data.value += service.price * 80;
      }
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

  return (
    <Modal
      className="modal-finalize-commission"
      title="Agendar Atendimento"
      visible={show}
      onOk={() => onFinish(getCommission())}
      onCancel={() => hide()}
    >
      {/* <div className="attendance-item">
        <span className="label">Data</span>
        <span className="value">{attendance.date}</span>
      </div>
      <div className="attendance-item">
        <span className="label">"Serviços</span>
        <span className="value">{attendance.services?.map(item => item.name).join(', ')}</span>
      </div> */}
      <div className="attendance-item">
        <span className="label">"Valor Total de Comissão</span>
        <span className="value">{calcTotalValue()}</span>
      </div>
    </Modal>
  );
}

export default FinalizeUserAttendancesModal;
