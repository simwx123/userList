import React from "react";
import { Table } from "antd";
import { useHistory } from "react-router-dom";
import "./tableStyles.css";

type Props = {
  dataColumns: any;
  dataItems: any;
  setClickRowData: any;
  pagination: any;
};

export const TableList: React.FC<Props> = ({
  dataColumns,
  dataItems,
  setClickRowData,
  pagination,
}) => {
  const history = useHistory();

  const paginClick = ({ current, pageSize }: any) => {
    const search = new URLSearchParams();
    search.append("page", current);
    search.append("size", pageSize);
    history.push({
      search: search.toString(),
    });
  };

  return (
    <Table
      className={"userTable"}
      onRow={(record) => {
        return {
          onClick: () => setClickRowData(record),
        };
      }}
      rowKey="id"
      columns={dataColumns}
      dataSource={dataItems}
      pagination={pagination || false}
      onChange={paginClick}
      bordered={true}
      rowClassName={(_, index) => (index % 2 === 0 ? "rowgray" : "rowwhite")}
      scroll={{ x: 250, y: 120 }}
    />
  );
};
