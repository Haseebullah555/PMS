import SetLang from "../../../../custom/SetLang";


export default function ExpandableDetail({ data, formik }) {
	return (
		<div className="card shadow">
			{/* <PointsModal formik={formik} data={data} /> */}
			{/* <div className="col-12"> */}
			<table className="table table-responsive mb-4">
				<thead className="table-secondary " style={{ textAlign: "center" }}>
					<tr>
						<th width="1%">{SetLang("Last Name")}</th>
						<th width="1%">{SetLang("Card ID#")}</th>
						<th width="3%">{SetLang("Job")}</th>

						{data.employee_type_id == "1" && (
							<th width="1%">{SetLang("Stip")}</th>
						)}
						{data.employee_type_id == "2" && (
							<th width="2%">{SetLang("Rotba")}</th>
						)}
						{data.employee_type_id == "3" && (
							<th width="2%">{SetLang("Stip")}</th>
						)}
						<th width="1%">{SetLang("Status")}</th>
						<th width="1%">{SetLang("Account Name")}</th>
						<th width="1%">{SetLang("Account Number")}</th>
						<th width="2%">{SetLang("Phone")}</th>
						{data.present && <th width="1%">{SetLang("Present")}</th>}
						{formik && <th width="4%">{SetLang("Remarks")}</th>}
					</tr>
				</thead>
				<tbody style={{ textAlign: "center" }}>
					<tr>
						<td>{data.last_name_da}</td>
						<td>{data.moi_card_number}</td>
						<td>
							{data.civilian_job_title ||
								data.militry_job_title ||
								data.nta_job_title ||
								data.contractual_job_title
							}
						</td>
						{data.step && (
							<td>{data.step}</td>
						)}
						{data.military_grade_category && (
							<td>{data.military_grade_category}</td>
						)}
						{data.nta_grade && (
							<td>{data.nta_grade}</td>
						)}
						<td>{data.e_job_status}</td>
						<td>{data.account_name}</td>
						<td>{data.account_number}</td>
						<td>{data.phone}</td>
						{data.present && <td>{data.present}</td>}
						{formik && (
							<td>
								<textarea
									type="text"
									rows={1}
									name={`arrayData[${data.index}].item_remarks`}
									value={formik.values?.arrayData[data.index]?.item_remarks}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									className="form-control"
								/>
							</td>
						)}
					</tr>
				</tbody>
			</table>
			{/* </div> */}
		</div>
	);
}
