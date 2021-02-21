import React from "react";
import "./modalStyles.css";
import { Modal, Button, Row, Col } from "antd";
import { useLocation, useHistory } from "react-router-dom";
import { useSelector, shallowEqual } from "react-redux";

const PREFIX = "#details/";
type Props = {
  modaltitle: string;
};

export const Smodal: React.FC<Props> = ({ modaltitle, ...props }) => {
	const history = useHistory();
	const location = useLocation() || {};
	const idx = parseInt((location.hash || "").substring(PREFIX.length));
	const users: readonly uList[] = useSelector(
		(state: UsersState) => state.users,
		shallowEqual
	);
	const udetails = users[idx];
	if (!udetails) return null;

	const close = () => {
		history.push({
			hash: "",
			search: history.location.search,
		} as any);
	};

	return (
		<Modal
			visible={(location.hash || "").includes(PREFIX)}
			width={370}
			title={modaltitle}
			maskClosable={false}
			closable={false}
			footer={false}
			bodyStyle={{ textAlign: "center", padding: 0 }}
			{...props}
		>
			<div className="bodydetails">
				<Row style={{ paddingBottom: 12 }}>
					<Col span={7}></Col>
					<Col span={17}>
						<img alt="profileimg" src={udetails.avatar} />
					</Col>
				</Row>
				<Row>
					<Col span={7}>ID:</Col>
					<Col span={17}>{udetails.id}</Col>
				</Row>
				<Row>
					<Col span={7}>First Name:</Col>
					<Col span={17}>{udetails.first_name}</Col>
				</Row>
				<Row>
					<Col span={7}>Last Name:</Col>
					<Col span={17}>{udetails.last_name}</Col>
				</Row>
				<Row>
					<Col span={7}>Email:</Col>
					<Col span={17}>{udetails.email}</Col>
				</Row>
			</div>

			<Button className="closebtn" onClick={close}>
        Close
			</Button>
		</Modal>
	);
};

export default Smodal;
