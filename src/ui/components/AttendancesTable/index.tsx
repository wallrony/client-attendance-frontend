import { DeleteOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import React from 'react';
import Attendance from '../../../core/models/Attendance';

import './styles.css';

interface AttendaceTableRowProps {
  key: string,
  id: number | undefined,
  name: string,
  qtd_services: string,
  edit: () => void,
  delete: () => void
}

interface AttendancesTableProps {
  attendances: Attendance[] | undefined;
  handleEdit: (data: Attendance) => void;
  handleDelete: (id: number | undefined) => void;
}

const AttendancesTable: React.FC<AttendancesTableProps> = ({ attendances, handleEdit, handleDelete }) => {
  if(!attendances) {
    return (
      <p>Carregando tipos de atendimento.</p>
    )
  } if(!attendances.length) {
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
      title: 'Qtd Serviços',
      dataIndex: 'qtd_services',
      key: 'qtd_services',
      render: (text: string) => (
        text
      )
    },
    {
      title: 'Excluir',
      dataIndex: 'delete',
      key: 'delete',
      render: (text: string, record: AttendaceTableRowProps) => (
        <div className="cell-btn" onClick={() => handleDelete(record.id)}>
          <DeleteOutlined size={48} />
        </div>
      )
    },
  ];

  const data: AttendaceTableRowProps[] = attendances.map(item => {
    let qtd;

    if(item.services) {
      qtd = item.services.length;
    }

    return {
      key: `${item.title}-table-row`,
      id: item.id,
      name: item.title,
      qtd_services: String(qtd),
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

export default AttendancesTable;
