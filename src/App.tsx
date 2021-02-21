import React, { useCallback, useEffect } from "react";
import "./styles.css";
import { TableList } from "./components/TableList";
import { Smodal } from "./components/Smodal";
import { useSelector, shallowEqual } from "react-redux";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import { getUsers } from "./store/actionCreators";
import { modelKey } from "./util/common";
import queryString from "query-string";
import { useHistory, useLocation } from "react-router-dom";

const page = "1";
const size = "6";

const App: React.FC = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const history = useHistory() || {};
  const location = useLocation() || {};
  const query = (queryString.parse(location.search) as any) || {};
  const users: readonly uList[] = useSelector(
    (state: UsersState) => state.users,
    shallowEqual
  );
  const total = users[modelKey("t", query) as any] || 0;
  const userArr =
    (users[modelKey("p", query) as any] || []).map((id: number) => users[id]) ||
    [];

  useEffect(() => {
    if (userArr.length) return;
    if (!location.search) {
      const search = new URLSearchParams();
      search.append("page", page);
      search.append("size", size);
      return history.push({
        search: search.toString(),
      });
    }
    dispatch(getUsers(location.search));
  }, [dispatch, location, userArr]);

  const details = useCallback(
    (items) => {
      history.push({
        hash: `details/${items.id}`,
        search: location.search,
      } as any);
    },
    [location]
  );

  const columns = [
    {
      title: "ID",
      key: "id",
      dataIndex: "id",
      align: "center",
      fixed: true,
      width: 50,
      render(text: number, _: any, index: number) {
        return {
          props: {
            className: index % 2 === 0 ? "rowgray" : "rowwhite",
          },
          children: <div>{text}</div>,
        };
      },
    },
    {
      title: "GIVEN NAME",
      key: "first_name",
      dataIndex: "first_name",
      align: "center",
      width: 150,
    },
    {
      title: "FAMILY NAME",
      key: "last_name",
      dataIndex: "last_name",
      align: "center",
      width: 150,
    },
    {
      title: "EMAIL",
      key: "email",
      dataIndex: "email",
      align: "center",
      width: 150,
    },
  ];

  return (
    <main>
      <TableList
        dataColumns={columns}
        dataItems={userArr}
        setClickRowData={details}
        pagination={{
          current: +query.page,
          pageSize: +query.size,
          total: +total,
          position: ["bottomCenter"],
          size: "small",
        }}
      />

      <Smodal modaltitle="Profile" />
    </main>
  );
};

export default App;
