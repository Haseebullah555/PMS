import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { getUsers, deleteUser } from "../../../redux/slices/userSlice/userSlice";
import SetLang from "../../custom/SetLang";
import DataTable from 'react-data-table-component';
import CustomLoader from './../../custom/loader/CustomLoader';

export default function UserList() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [tableData, setTableData] = useState([])
	const [totalRows, setTotalRows] = useState(0)
	const [isLoading, setIsLoading] = useState(false)
	const [rejectLoading, setRejectLoading] = useState(false)

	const [currentPage, setCurrentPage] = useState(1)
	const [itemsPerPage, setItemsPerPage] = useState(10)
	const [sortBy, setSortBy] = useState('id')
	const [sortDirection, setSortDirection] = useState('asc')
	const [searchText, setSearchText] = useState('')

	const theme = useSelector((state) => {
		return state.general.theme
	})

	const selectorItems = useSelector((state) => {
		return state.user.items;
	});

	const handleDelete = (id) => {
		Swal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!",
		}).then((result) => {
			if (result.isConfirmed) {
				dispatch(deleteUser(id))
					.then((res) => {
						dispatch(getUsers());
					})
					.catch((err) => {
						console.log(err);
					});
			}
		});
	};

	useEffect(() => {
		dispatch(getUsers());
	}, []);

	const columns = [
		{
			name: SetLang("ID"),
			selector: (row) => row.id,
			sortable: true,
			width: "60px",
		},
		{
			name: SetLang("Name"),
			selector: (row) => row.name,
			sortable: true,
		},
		{
			name: SetLang("Email"),
			selector: (row) => row.email,
			sortable: true,
		},

		{
			name: SetLang("Action"),
			cell: (row) => (
				<>
					<span
						onClick={() =>
							// navigate("/users/user-detail", { state: { id: row.id } })
							navigate(`/users/overview/${row.id}`, { state: { id: row.id } })
						}
						className="btn fa fa-eye p-1 m-1 text-primary border border-primary p-2 rounded"></span>
					|
					<span
						onClick={() => {
							handleDelete(row.id);
						}}
						className="btn fa fa-trash p-1 m-1 text-danger border border-danger p-2 rounded"></span>
				</>
			),
		},
	];

	const filteredData = selectorItems?.filter((item) =>
		Object.values(item).some(
			(value) =>
				value &&
				value.toString().toLowerCase().includes(searchText.toLowerCase())
		)
	);

	const CustomSearch = ({ searchText, onSearch }) => (
		<div className="col-12">
			<div className="row  justify-content-between ">
				<div className="col-sm-12 col-md-2">
					<button
						className="btn btn-success"
						onClick={() => navigate("/users/create")}>
						{SetLang("New")}
					</button>
				</div>
				<div className="col-sm-12 col-md-4">
					<input
						type="text"
						value={searchText}
						onChange={(e) => onSearch(e.target.value)}
						className="form-control col"
						placeholder="جستجو..."
						autoFocus
					/>
				</div>
			</div>
		</div>
	);


	return (
		<div className="p-5 card shadow">

			<DataTable
				className='custom-data-table'
				theme={theme}
				columns={columns}
				data={filteredData}
				subHeader
				subHeaderComponent={
					<CustomSearch searchText={searchText} onSearch={setSearchText} />
				}

				sortServer
				onSort={(column, direction) => {
					setSortBy(column.sortField)
					setSortDirection(direction)
				}}
				progressPending={!filteredData || false}
				progressComponent={<CustomLoader />}
				onChangePage={(page) => setCurrentPage(page)}
				onChangeRowsPerPage={(itemsPerPage) => setItemsPerPage(itemsPerPage)}
				pagination
				paginationServer
				paginationServerOptions
				paginationTotalRows={totalRows}
				// expandableRows
				// expandableRowsComponent={ExpandableDetail}
				highlightOnHover
				striped



			/>


		</div>
	);
}
