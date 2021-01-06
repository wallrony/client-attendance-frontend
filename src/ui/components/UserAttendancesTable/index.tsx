import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import React from 'react';
import UserAttendance from '../../../core/models/UserAttendance';
import { formatDate } from '../../../core/utils/DateUtils';

interface UserAttendancesTableRowProps {
  key: string,
  id: number | undefined,
  name: string,
  date: string,
  view?: () => void;
  delete?: () => void
}

interface UserAttendancesTableProps {
  userAttendances: any[] | undefined;
  handleDelete: (id: number | undefined) => void;
  doctorView?: boolean;
  handleDoctorView?: (data: UserAttendance | undefined) => void;
}

const UserAttendancesTable: React.FC<UserAttendancesTableProps> = ({ doctorView, handleDoctorView, userAttendances, handleDelete }) => {
  if(!userAttendances) {
    return (
      <p>Carregando tipos de atendimento.</p>
    )
  } if(!userAttendances.length) {
    return (
      <p>Nenhum atendimento foi encontrado.</p>
    );
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (text: string) => (
        text
      )
    },
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'nome',
      render: (text: string) => (
        text
      )
    },
    {
      title: 'Data',
      dataIndex: 'date',
      key: 'date',
      render: (text: string) => (
        text
      )
    },
    {
      title: 'Excluir',
      dataIndex: 'delete',
      key: 'delete',
      render: (text: string, record: UserAttendancesTableRowProps) => (
        <div className="cell-btn" onClick={() => handleDelete(record.id)}>
          <DeleteOutlined size={48} />
        </div>
      )
    },
  ];

  function getUserAttendance(id: number | undefined) {
    if(userAttendances && id) {
      for(const attendance of userAttendances) {
        if(attendance.id === id) {
          return attendance;
        }
      }
    }
  }

  if(doctorView && handleDoctorView) {
    columns.splice(columns.length - 1, 1);

    columns.push({
      title: 'Atender',
      dataIndex: 'attend',
      key: 'attend',
      render: (text: string, record: UserAttendancesTableRowProps) => (
        <div className="cell-btn" onClick={() => handleDoctorView(getUserAttendance(record.id))}>
          <EyeOutlined size={48} />
        </div>
      )
    },)
  }

  const data: UserAttendancesTableRowProps[] = userAttendances.map(item => {
    return {
      key: `${item.name}-table-row`,
      id: item.id,
      name: item.title,
      date: formatDate(item.date),
      edit: () => {},
      delete: () => {}
    };
  });

  return (
    <Table
      id="app-attendances-table"
      dataSource={data}
      columns={columns}
    />
  );
}

export default UserAttendancesTable;
