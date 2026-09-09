import React, { useState } from "react";
import "./App.css";

function App() {
  const [activePage, setActivePage] = useState("Dashboard");

  /* =========================
     EMPLOYEES
  ========================= */

  const [employees, setEmployees] = useState([
    {
      id: "EMP001",
      name: "Arun Kumar",
      role: "UI Designer",
      department: "Design",
      status: "Active",
      salary: 45000,
    },
    {
      id: "EMP002",
      name: "Priya Sharma",
      role: "HR Executive",
      department: "Human Resources",
      status: "Active",
      salary: 42000,
    },
    {
      id: "EMP003",
      name: "Rahul Raj",
      role: "Software Developer",
      department: "IT",
      status: "Active",
      salary: 65000,
    },
    {
      id: "EMP004",
      name: "Divya S",
      role: "Accountant",
      department: "Finance",
      status: "On Leave",
      salary: 48000,
    },
    {
      id: "EMP005",
      name: "Karthik M",
      role: "Marketing Executive",
      department: "Marketing",
      status: "Active",
      salary: 40000,
    },
  ]);

  const [search, setSearch] = useState("");
  const [department, setDepartment] =
    useState("All Departments");

  const [showEmployeeForm, setShowEmployeeForm] =
    useState(false);

  const [newEmployee, setNewEmployee] = useState({
    name: "",
    role: "",
    department: "IT",
    salary: "",
  });

  /* =========================
     LEAVE DATA
  ========================= */

  const [leaveRequests, setLeaveRequests] = useState([
    {
      id: 1,
      name: "Divya S",
      type: "Casual Leave",
      from: "Sep 10, 2026",
      to: "Sep 11, 2026",
      days: 2,
      reason: "Personal work",
      status: "Approved",
    },
    {
      id: 2,
      name: "Karthik M",
      type: "Sick Leave",
      from: "Sep 12, 2026",
      to: "Sep 12, 2026",
      days: 1,
      reason: "Not feeling well",
      status: "Pending",
    },
    {
      id: 3,
      name: "Priya Sharma",
      type: "Personal Leave",
      from: "Sep 15, 2026",
      to: "Sep 17, 2026",
      days: 3,
      reason: "Family function",
      status: "Pending",
    },
    {
      id: 4,
      name: "Arun Kumar",
      type: "Casual Leave",
      from: "Sep 20, 2026",
      to: "Sep 21, 2026",
      days: 2,
      reason: "Personal work",
      status: "Rejected",
    },
  ]);

  const [showLeaveForm, setShowLeaveForm] =
    useState(false);

  const [newLeave, setNewLeave] = useState({
    name: "",
    type: "Casual Leave",
    from: "",
    to: "",
    days: "1",
    reason: "",
  });

  /* =========================
     RECRUITMENT
  ========================= */

  const [jobs, setJobs] = useState([
    {
      id: 1,
      icon: "💻",
      title: "Frontend Developer",
      department: "IT Department",
      candidates: 4,
      type: "Full Time",
    },
    {
      id: 2,
      icon: "🎨",
      title: "UI/UX Designer",
      department: "Design Department",
      candidates: 7,
      type: "Full Time",
    },
    {
      id: 3,
      icon: "📢",
      title: "Marketing Executive",
      department: "Marketing Department",
      candidates: 5,
      type: "Full Time",
    },
    {
      id: 4,
      icon: "👨‍💼",
      title: "HR Executive",
      department: "Human Resources",
      candidates: 3,
      type: "Full Time",
    },
  ]);

  const [showJobForm, setShowJobForm] =
    useState(false);

  const [newJob, setNewJob] = useState({
    title: "",
    department: "IT Department",
    type: "Full Time",
  });

  /* =========================
     SETTINGS
  ========================= */

  const [notifications, setNotifications] =
    useState(true);

  const [emailAlerts, setEmailAlerts] =
    useState(true);

  const [showNotificationPanel, setShowNotificationPanel] =
    useState(false);

  /* =========================
     NAVIGATION
  ========================= */

  const menuItems = [
    { name: "Dashboard", icon: "📊" },
    { name: "Employees", icon: "👥" },
    { name: "Attendance", icon: "🕐" },
    { name: "Leave Management", icon: "🏖️" },
    { name: "Payroll", icon: "💰" },
    { name: "Recruitment", icon: "📋" },
  ];

  /* =========================
     ADD EMPLOYEE
  ========================= */

  const handleAddEmployee = (e) => {
    e.preventDefault();

    if (
      !newEmployee.name ||
      !newEmployee.role ||
      !newEmployee.salary
    ) {
      alert("Please fill all employee details");
      return;
    }

    const employee = {
      id: `EMP${String(
        employees.length + 1
      ).padStart(3, "0")}`,
      name: newEmployee.name,
      role: newEmployee.role,
      department: newEmployee.department,
      status: "Active",
      salary: Number(newEmployee.salary),
    };

    setEmployees([...employees, employee]);

    setNewEmployee({
      name: "",
      role: "",
      department: "IT",
      salary: "",
    });

    setShowEmployeeForm(false);
  };

  /* =========================
     DELETE EMPLOYEE
  ========================= */

  const deleteEmployee = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (confirmDelete) {
      setEmployees(
        employees.filter(
          (employee) => employee.id !== id
        )
      );
    }
  };

  /* =========================
     FILTER
  ========================= */

  const filteredEmployees = employees.filter(
    (employee) => {
      const matchesSearch =
        employee.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        employee.id
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        employee.role
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesDepartment =
        department === "All Departments" ||
        employee.department === department;

      return matchesSearch && matchesDepartment;
    }
  );

  /* =========================
     EMPLOYEE TABLE
  ========================= */

  const EmployeeTable = ({
    data,
    actions = false,
  }) => {
    return (
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Employee</th>
              <th>ID</th>
              <th>Department</th>
              <th>Role</th>
              <th>Status</th>
              {actions && <th>Action</th>}
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={actions ? 6 : 5}>
                  <div className="empty-state">
                    <span>🔍</span>
                    <h3>No employees found</h3>
                    <p>
                      Try another search or filter.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((employee) => (
                <tr key={employee.id}>
                  <td>
                    <div className="table-employee">
                      <div className="employee-avatar">
                        {employee.name.charAt(0)}
                      </div>

                      <strong>
                        {employee.name}
                      </strong>
                    </div>
                  </td>

                  <td>{employee.id}</td>
                  <td>{employee.department}</td>
                  <td>{employee.role}</td>

                  <td>
                    <span
                      className={`status ${
                        employee.status ===
                        "Active"
                          ? "present"
                          : "leave"
                      }`}
                    >
                      {employee.status}
                    </span>
                  </td>

                  {actions && (
                    <td>
                      <button
                        className="delete-btn"
                        onClick={() =>
                          deleteEmployee(
                            employee.id
                          )
                        }
                      >
                        🗑️
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    );
  };

  /* =========================
     DASHBOARD
  ========================= */

  const renderDashboard = () => {
    const activeEmployees =
      employees.filter(
        (employee) =>
          employee.status === "Active"
      ).length;

    const leaveEmployees =
      employees.filter(
        (employee) =>
          employee.status === "On Leave"
      ).length;

    return (
      <>
        <div className="page-title">
          <div>
            <h1>Dashboard</h1>
            <p>
              Welcome back! Here's what's happening
              today.
            </p>
          </div>

          <button
            className="primary-btn"
            onClick={() =>
              setShowEmployeeForm(true)
            }
          >
            + Add Employee
          </button>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon blue">
              👥
            </div>
            <div>
              <p>Total Employees</p>
              <h2>{employees.length}</h2>
              <span className="positive">
                ↑ 12%
              </span>
              <small> from last month</small>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon green">
              ✓
            </div>
            <div>
              <p>Present Today</p>
              <h2>{activeEmployees}</h2>
              <span className="positive">
                ↑ 8%
              </span>
              <small> from yesterday</small>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon orange">
              🏖️
            </div>
            <div>
              <p>On Leave</p>
              <h2>{leaveEmployees}</h2>
              <span className="negative">
                ↓ 3%
              </span>
              <small> from yesterday</small>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon purple">
              💼
            </div>
            <div>
              <p>Open Positions</p>
              <h2>{jobs.length}</h2>
              <span className="positive">
                ↑ 4
              </span>
              <small> new this month</small>
            </div>
          </div>
        </div>

        <div className="dashboard-grid">

          <div className="dashboard-card">
            <div className="card-header">
              <div>
                <h3>
                  Attendance Overview
                </h3>
                <p>
                  Employee attendance for today
                </p>
              </div>

              <button
                className="view-btn"
                onClick={() =>
                  setActivePage("Attendance")
                }
              >
                View All
              </button>
            </div>

            {employees
              .slice(0, 4)
              .map((employee, index) => (
                <div
                  className="attendance-row"
                  key={employee.id}
                >
                  <div className="employee-avatar">
                    {employee.name.charAt(0)}
                  </div>

                  <div className="employee-name">
                    <strong>
                      {employee.name}
                    </strong>

                    <span>
                      {employee.status ===
                      "On Leave"
                        ? "-"
                        : [
                            "09:02 AM",
                            "09:10 AM",
                            "08:55 AM",
                            "09:25 AM",
                          ][index]}
                    </span>
                  </div>

                  <span
                    className={`status ${
                      employee.status ===
                      "On Leave"
                        ? "leave"
                        : "present"
                    }`}
                  >
                    {employee.status ===
                    "On Leave"
                      ? "Leave"
                      : "Present"}
                  </span>
                </div>
              ))}
          </div>

          <div className="dashboard-card">
            <div className="card-header">
              <div>
                <h3>
                  Leave Requests
                </h3>
                <p>
                  Recent employee requests
                </p>
              </div>

              <button
                className="view-btn"
                onClick={() =>
                  setActivePage(
                    "Leave Management"
                  )
                }
              >
                View All
              </button>
            </div>

            {leaveRequests
              .slice(0, 3)
              .map((leave) => (
                <div
                  className="leave-row"
                  key={leave.id}
                >
                  <div className="employee-avatar">
                    {leave.name.charAt(0)}
                  </div>

                  <div className="leave-info">
                    <strong>
                      {leave.name}
                    </strong>

                    <span>
                      {leave.type} •{" "}
                      {leave.days} Day
                      {leave.days > 1
                        ? "s"
                        : ""}
                    </span>
                  </div>

                  <span
                    className={`status ${
                      leave.status ===
                      "Approved"
                        ? "approved"
                        : leave.status ===
                          "Rejected"
                        ? "leave"
                        : "pending"
                    }`}
                  >
                    {leave.status}
                  </span>
                </div>
              ))}
          </div>

        </div>

        <div className="dashboard-card recent-card">
          <div className="card-header">
            <div>
              <h3>
                Recent Employees
              </h3>
              <p>
                Recently added employees
              </p>
            </div>

            <button
              className="view-btn"
              onClick={() =>
                setActivePage("Employees")
              }
            >
              View All
            </button>
          </div>

          <EmployeeTable
            data={employees.slice(0, 4)}
          />
        </div>
      </>
    );
  };

  /* =========================
     EMPLOYEES PAGE
  ========================= */

  const renderEmployees = () => {
    const activeCount =
      employees.filter(
        (employee) =>
          employee.status === "Active"
      ).length;

    const leaveCount =
      employees.filter(
        (employee) =>
          employee.status === "On Leave"
      ).length;

    return (
      <>
        <div className="page-title">
          <div>
            <h1>Employees</h1>
            <p>
              Manage all employees from one place.
            </p>
          </div>

          <button
            className="primary-btn"
            onClick={() =>
              setShowEmployeeForm(true)
            }
          >
            + Add Employee
          </button>
        </div>

        <div className="employee-summary">
          <div>
            <span>Total Employees</span>
            <strong>{employees.length}</strong>
          </div>

          <div>
            <span>Active Employees</span>
            <strong>{activeCount}</strong>
          </div>

          <div>
            <span>On Leave</span>
            <strong>{leaveCount}</strong>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="search-area">
            <input
              type="text"
              placeholder="🔍 Search by name, ID or role..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

            <select
              value={department}
              onChange={(e) =>
                setDepartment(e.target.value)
              }
            >
              <option>
                All Departments
              </option>
              <option>IT</option>
              <option>Design</option>
              <option>Finance</option>
              <option>Marketing</option>
              <option>
                Human Resources
              </option>
            </select>
          </div>

          <EmployeeTable
            data={filteredEmployees}
            actions={true}
          />
        </div>
      </>
    );
  };

  /* =========================
     ATTENDANCE
  ========================= */

  const renderAttendance = () => {
    const attendanceData =
      employees.map(
        (employee, index) => ({
          ...employee,

          checkIn:
            employee.status ===
            "On Leave"
              ? "-"
              : [
                  "09:02 AM",
                  "09:10 AM",
                  "08:55 AM",
                  "09:25 AM",
                  "09:05 AM",
                ][index % 5],

          checkOut:
            employee.status ===
            "On Leave"
              ? "-"
              : [
                  "06:05 PM",
                  "06:15 PM",
                  "05:55 PM",
                  "06:20 PM",
                  "06:10 PM",
                ][index % 5],

          attendanceStatus:
            employee.status ===
            "On Leave"
              ? "Leave"
              : index === 3
              ? "Late"
              : "Present",
        })
      );

    const presentCount =
      attendanceData.filter(
        (item) =>
          item.attendanceStatus ===
          "Present"
      ).length;

    const lateCount =
      attendanceData.filter(
        (item) =>
          item.attendanceStatus ===
          "Late"
      ).length;

    const leaveCount =
      attendanceData.filter(
        (item) =>
          item.attendanceStatus ===
          "Leave"
      ).length;

    return (
      <>
        <div className="page-title">
          <div>
            <h1>Attendance</h1>
            <p>
              Track employee attendance and
              working hours.
            </p>
          </div>

          <button
            className="primary-btn"
            onClick={() =>
              alert(
                "Attendance report exported successfully!"
              )
            }
          >
            Export Report
          </button>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon green">
              ✓
            </div>
            <div>
              <p>Present Today</p>
              <h2>{presentCount}</h2>
              <small>
                Employees present
              </small>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon orange">
              🏖️
            </div>
            <div>
              <p>On Leave</p>
              <h2>{leaveCount}</h2>
              <small>
                Employees on leave
              </small>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon blue">
              ⏰
            </div>
            <div>
              <p>Late Arrivals</p>
              <h2>{lateCount}</h2>
              <small>
                Today's late arrivals
              </small>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon purple">
              👥
            </div>
            <div>
              <p>Total Employees</p>
              <h2>{employees.length}</h2>
              <small>
                Registered employees
              </small>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <div>
              <h3>
                Today's Attendance
              </h3>
              <p>
                September 9, 2026
              </p>
            </div>

            <select className="attendance-filter">
              <option>Today</option>
              <option>This Week</option>
              <option>This Month</option>
            </select>
          </div>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>ID</th>
                  <th>Check In</th>
                  <th>Check Out</th>
                  <th>Working Hours</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {attendanceData.map(
                  (employee) => (
                    <tr key={employee.id}>
                      <td>
                        <div className="table-employee">
                          <div className="employee-avatar">
                            {employee.name.charAt(
                              0
                            )}
                          </div>
                          <strong>
                            {employee.name}
                          </strong>
                        </div>
                      </td>

                      <td>{employee.id}</td>
                      <td>{employee.checkIn}</td>
                      <td>{employee.checkOut}</td>

                      <td>
                        {employee.attendanceStatus ===
                        "Leave"
                          ? "-"
                          : "8h 15m"}
                      </td>

                      <td>
                        <span
                          className={`status ${
                            employee.attendanceStatus ===
                            "Present"
                              ? "present"
                              : employee.attendanceStatus ===
                                "Late"
                              ? "pending"
                              : "leave"
                          }`}
                        >
                          {
                            employee.attendanceStatus
                          }
                        </span>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="attendance-summary">
          <div className="summary-box">
            <span>
              Average Check-in
            </span>
            <strong>
              09:08 AM
            </strong>
          </div>

          <div className="summary-box">
            <span>
              Average Working Hours
            </span>
            <strong>
              8h 12m
            </strong>
          </div>

          <div className="summary-box">
            <span>
              Attendance Rate
            </span>
            <strong>
              91.4%
            </strong>
          </div>
        </div>
      </>
    );
  };

  /* =========================
     APPLY LEAVE
  ========================= */

  const handleApplyLeave = (e) => {
    e.preventDefault();

    if (
      !newLeave.name ||
      !newLeave.from ||
      !newLeave.to ||
      !newLeave.reason
    ) {
      alert("Please fill all leave details");
      return;
    }

    const request = {
      id: Date.now(),
      name: newLeave.name,
      type: newLeave.type,
      from: newLeave.from,
      to: newLeave.to,
      days: Number(newLeave.days),
      reason: newLeave.reason,
      status: "Pending",
    };

    setLeaveRequests([
      request,
      ...leaveRequests,
    ]);

    setNewLeave({
      name: "",
      type: "Casual Leave",
      from: "",
      to: "",
      days: "1",
      reason: "",
    });

    setShowLeaveForm(false);
  };

  /* =========================
     LEAVE STATUS
  ========================= */

  const updateLeaveStatus = (
    id,
    status
  ) => {
    setLeaveRequests(
      leaveRequests.map((leave) =>
        leave.id === id
          ? {
              ...leave,
              status,
            }
          : leave
      )
    );
  };

  /* =========================
     LEAVE PAGE
  ========================= */

  const renderLeave = () => {
    const pending =
      leaveRequests.filter(
        (leave) =>
          leave.status === "Pending"
      ).length;

    const approved =
      leaveRequests.filter(
        (leave) =>
          leave.status === "Approved"
      ).length;

    const rejected =
      leaveRequests.filter(
        (leave) =>
          leave.status === "Rejected"
      ).length;

    return (
      <>
        <div className="page-title">
          <div>
            <h1>
              Leave Management
            </h1>
            <p>
              Manage employee leave requests
              and approvals.
            </p>
          </div>

          <button
            className="primary-btn"
            onClick={() =>
              setShowLeaveForm(true)
            }
          >
            + Apply Leave
          </button>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon orange">
              ⏳
            </div>
            <div>
              <p>
                Pending Requests
              </p>
              <h2>{pending}</h2>
              <small>
                Need approval
              </small>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon green">
              ✓
            </div>
            <div>
              <p>Approved</p>
              <h2>{approved}</h2>
              <small>
                Approved requests
              </small>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon blue">
              📅
            </div>
            <div>
              <p>Total Requests</p>
              <h2>
                {leaveRequests.length}
              </h2>
              <small>
                This month
              </small>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon purple">
              ❌
            </div>
            <div>
              <p>Rejected</p>
              <h2>{rejected}</h2>
              <small>
                Rejected requests
              </small>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <div>
              <h3>
                Leave Requests
              </h3>
              <p>
                Review and manage employee
                applications
              </p>
            </div>
          </div>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Leave Type</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Days</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {leaveRequests.map(
                  (leave) => (
                    <tr key={leave.id}>
                      <td>
                        <div className="table-employee">
                          <div className="employee-avatar">
                            {leave.name.charAt(
                              0
                            )}
                          </div>
                          <strong>
                            {leave.name}
                          </strong>
                        </div>
                      </td>

                      <td>{leave.type}</td>
                      <td>{leave.from}</td>
                      <td>{leave.to}</td>
                      <td>{leave.days}</td>

                      <td>
                        <span
                          className={`status ${
                            leave.status ===
                            "Approved"
                              ? "approved"
                              : leave.status ===
                                "Rejected"
                              ? "leave"
                              : "pending"
                          }`}
                        >
                          {leave.status}
                        </span>
                      </td>

                      <td>
                        {leave.status ===
                        "Pending" ? (
                          <div className="action-buttons">
                            <button
                              className="approve-btn"
                              onClick={() =>
                                updateLeaveStatus(
                                  leave.id,
                                  "Approved"
                                )
                              }
                            >
                              ✓
                            </button>

                            <button
                              className="reject-btn"
                              onClick={() =>
                                updateLeaveStatus(
                                  leave.id,
                                  "Rejected"
                                )
                              }
                            >
                              ✕
                            </button>
                          </div>
                        ) : (
                          <button
                            className="small-btn"
                            onClick={() =>
                              alert(
                                `Reason: ${leave.reason}`
                              )
                            }
                          >
                            View
                          </button>
                        )}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>

        {showLeaveForm && (
          <div
            className="modal-overlay"
            onClick={() =>
              setShowLeaveForm(false)
            }
          >
            <div
              className="employee-modal"
              onClick={(e) =>
                e.stopPropagation()
              }
            >
              <div className="modal-header">
                <div>
                  <h2>
                    Apply Leave
                  </h2>
                  <p>
                    Submit a new leave request
                  </p>
                </div>

                <button
                  className="close-btn"
                  onClick={() =>
                    setShowLeaveForm(false)
                  }
                >
                  ✕
                </button>
              </div>

              <form
                onSubmit={handleApplyLeave}
              >
                <div className="form-group">
                  <label>
                    Employee Name
                  </label>

                  <input
                    type="text"
                    placeholder="Enter employee name"
                    value={newLeave.name}
                    onChange={(e) =>
                      setNewLeave({
                        ...newLeave,
                        name: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>
                    Leave Type
                  </label>

                  <select
                    value={newLeave.type}
                    onChange={(e) =>
                      setNewLeave({
                        ...newLeave,
                        type: e.target.value,
                      })
                    }
                  >
                    <option>
                      Casual Leave
                    </option>
                    <option>
                      Sick Leave
                    </option>
                    <option>
                      Personal Leave
                    </option>
                    <option>
                      Emergency Leave
                    </option>
                  </select>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>From</label>

                    <input
                      type="date"
                      value={newLeave.from}
                      onChange={(e) =>
                        setNewLeave({
                          ...newLeave,
                          from: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label>To</label>

                    <input
                      type="date"
                      value={newLeave.to}
                      onChange={(e) =>
                        setNewLeave({
                          ...newLeave,
                          to: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>
                    Number of Days
                  </label>

                  <input
                    type="number"
                    min="1"
                    value={newLeave.days}
                    onChange={(e) =>
                      setNewLeave({
                        ...newLeave,
                        days: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>
                    Reason
                  </label>

                  <textarea
                    className="form-textarea"
                    placeholder="Enter leave reason"
                    value={newLeave.reason}
                    onChange={(e) =>
                      setNewLeave({
                        ...newLeave,
                        reason:
                          e.target.value,
                      })
                    }
                  />
                </div>

                <div className="modal-actions">
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() =>
                      setShowLeaveForm(false)
                    }
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="primary-btn"
                  >
                    Submit Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </>
    );
  };

  /* =========================
     PAYROLL
  ========================= */

  const renderPayroll = () => {
    const totalPayroll =
      employees.reduce(
        (total, employee) =>
          total + employee.salary,
        0
      );

    const paidPayroll =
      Math.round(totalPayroll * 0.85);

    const pendingPayroll =
      totalPayroll - paidPayroll;

    return (
      <>
        <div className="page-title">
          <div>
            <h1>Payroll</h1>
            <p>
              Manage employee salaries and
              monthly payroll.
            </p>
          </div>

          <button
            className="primary-btn"
            onClick={() =>
              alert(
                "Payroll generated successfully!"
              )
            }
          >
            Generate Payroll
          </button>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon blue">
              💰
            </div>
            <div>
              <p>Total Payroll</p>
              <h2>
                ₹
                {totalPayroll.toLocaleString(
                  "en-IN"
                )}
              </h2>
              <small>This month</small>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon green">
              ✓
            </div>
            <div>
              <p>Paid</p>
              <h2>
                ₹
                {paidPayroll.toLocaleString(
                  "en-IN"
                )}
              </h2>
              <small>
                85% completed
              </small>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon orange">
              ⏳
            </div>
            <div>
              <p>Pending</p>
              <h2>
                ₹
                {pendingPayroll.toLocaleString(
                  "en-IN"
                )}
              </h2>
              <small>
                15% remaining
              </small>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon purple">
              👥
            </div>
            <div>
              <p>Employees</p>
              <h2>{employees.length}</h2>
              <small>
                Payroll employees
              </small>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <div>
              <h3>
                Salary Details
              </h3>
              <p>
                September 2026 payroll
              </p>
            </div>
          </div>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>ID</th>
                  <th>Department</th>
                  <th>Basic Salary</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {employees.map(
                  (employee) => (
                    <tr key={employee.id}>
                      <td>
                        <div className="table-employee">
                          <div className="employee-avatar">
                            {employee.name.charAt(
                              0
                            )}
                          </div>

                          <strong>
                            {employee.name}
                          </strong>
                        </div>
                      </td>

                      <td>{employee.id}</td>
                      <td>
                        {employee.department}
                      </td>

                      <td>
                        ₹
                        {employee.salary.toLocaleString(
                          "en-IN"
                        )}
                      </td>

                      <td>
                        <span className="status approved">
                          Processed
                        </span>
                      </td>

                      <td>
                        <button
                          className="small-btn"
                          onClick={() =>
                            alert(
                              `${employee.name} salary: ₹${employee.salary.toLocaleString(
                                "en-IN"
                              )}`
                            )
                          }
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="dashboard-card payroll-details">
          <div className="card-header">
            <div>
              <h3>
                Payroll Summary
              </h3>
              <p>
                Monthly salary breakdown
              </p>
            </div>
          </div>

          <div className="payroll-box">
            <div>
              <span>
                Employees Processed
              </span>
              <strong>
                {employees.length}
              </strong>
            </div>

            <div>
              <span>
                Gross Salary
              </span>
              <strong>
                ₹
                {totalPayroll.toLocaleString(
                  "en-IN"
                )}
              </strong>
            </div>

            <div>
              <span>
                Net Salary
              </span>
              <strong>
                ₹
                {paidPayroll.toLocaleString(
                  "en-IN"
                )}
              </strong>
            </div>
          </div>
        </div>
      </>
    );
  };

  /* =========================
     ADD JOB
  ========================= */

  const handleAddJob = (e) => {
    e.preventDefault();

    if (!newJob.title) {
      alert("Please enter job title");
      return;
    }

    const job = {
      id: Date.now(),
      icon: "💼",
      title: newJob.title,
      department: newJob.department,
      candidates: 0,
      type: newJob.type,
    };

    setJobs([...jobs, job]);

    setNewJob({
      title: "",
      department: "IT Department",
      type: "Full Time",
    });

    setShowJobForm(false);
  };

  /* =========================
     RECRUITMENT
  ========================= */

  const renderRecruitment = () => {
    const totalCandidates =
      jobs.reduce(
        (total, job) =>
          total + job.candidates,
        0
      );

    return (
      <>
        <div className="page-title">
          <div>
            <h1>Recruitment</h1>
            <p>
              Manage open positions and
              candidates.
            </p>
          </div>

          <button
            className="primary-btn"
            onClick={() =>
              setShowJobForm(true)
            }
          >
            + Add Job
          </button>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon purple">
              💼
            </div>
            <div>
              <p>Open Positions</p>
              <h2>{jobs.length}</h2>
              <small>
                Active job openings
              </small>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon blue">
              👥
            </div>
            <div>
              <p>Total Candidates</p>
              <h2>{totalCandidates}</h2>
              <small>
                Applications received
              </small>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon green">
              ✓
            </div>
            <div>
              <p>Interviews</p>
              <h2>12</h2>
              <small>
                Scheduled this week
              </small>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon orange">
              ⭐
            </div>
            <div>
              <p>Hired</p>
              <h2>8</h2>
              <small>
                This month
              </small>
            </div>
          </div>
        </div>

        <div className="recruitment-grid">
          {jobs.map((job) => (
            <div
              className="job-card"
              key={job.id}
            >
              <div className="job-icon">
                {job.icon}
              </div>

              <h3>{job.title}</h3>

              <p>{job.department}</p>

              <div className="job-info-row">
                <span>
                  👥 Candidates
                </span>

                <strong>
                  {job.candidates}
                </strong>
              </div>

              <div className="job-info-row">
                <span>
                  🕐 Job Type
                </span>

                <strong>
                  {job.type}
                </strong>
              </div>

              <button
                onClick={() =>
                  alert(
                    `${job.title}: ${job.candidates} candidates`
                  )
                }
              >
                View Candidates
              </button>
            </div>
          ))}
        </div>

        {showJobForm && (
          <div
            className="modal-overlay"
            onClick={() =>
              setShowJobForm(false)
            }
          >
            <div
              className="employee-modal"
              onClick={(e) =>
                e.stopPropagation()
              }
            >
              <div className="modal-header">
                <div>
                  <h2>
                    Add New Job
                  </h2>
                  <p>
                    Create a new job opening
                  </p>
                </div>

                <button
                  className="close-btn"
                  onClick={() =>
                    setShowJobForm(false)
                  }
                >
                  ✕
                </button>
              </div>

              <form
                onSubmit={handleAddJob}
              >
                <div className="form-group">
                  <label>
                    Job Title
                  </label>

                  <input
                    type="text"
                    placeholder="e.g. Backend Developer"
                    value={newJob.title}
                    onChange={(e) =>
                      setNewJob({
                        ...newJob,
                        title:
                          e.target.value,
                      })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>
                    Department
                  </label>

                  <select
                    value={
                      newJob.department
                    }
                    onChange={(e) =>
                      setNewJob({
                        ...newJob,
                        department:
                          e.target.value,
                      })
                    }
                  >
                    <option>
                      IT Department
                    </option>
                    <option>
                      Design Department
                    </option>
                    <option>
                      Finance Department
                    </option>
                    <option>
                      Marketing Department
                    </option>
                    <option>
                      Human Resources
                    </option>
                  </select>
                </div>

                <div className="form-group">
                  <label>
                    Job Type
                  </label>

                  <select
                    value={newJob.type}
                    onChange={(e) =>
                      setNewJob({
                        ...newJob,
                        type:
                          e.target.value,
                      })
                    }
                  >
                    <option>
                      Full Time
                    </option>
                    <option>
                      Part Time
                    </option>
                    <option>
                      Internship
                    </option>
                    <option>
                      Contract
                    </option>
                  </select>
                </div>

                <div className="modal-actions">
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() =>
                      setShowJobForm(false)
                    }
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="primary-btn"
                  >
                    Add Job
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </>
    );
  };

  /* =========================
     SETTINGS PAGE
  ========================= */

  const renderSettings = () => {
    return (
      <>
        <div className="page-title">
          <div>
            <h1>Settings</h1>
            <p>
              Manage your HR Portal preferences
              and account settings.
            </p>
          </div>
        </div>

        <div className="settings-grid">

          <div className="settings-card">
            <div className="settings-icon">
              👤
            </div>

            <div className="settings-content">
              <h3>
                Profile Settings
              </h3>

              <p>
                Update your personal information
                and profile details.
              </p>

              <button
                className="settings-btn"
                onClick={() =>
                  alert(
                    "Profile settings opened!"
                  )
                }
              >
                Manage Profile
              </button>
            </div>
          </div>

          <div className="settings-card">
            <div className="settings-icon">
              🔔
            </div>

            <div className="settings-content">
              <h3>
                Notifications
              </h3>

              <p>
                Manage email and system
                notification preferences.
              </p>

              <div className="setting-toggle-row">
                <span>
                  Push Notifications
                </span>

                <button
                  className={`toggle ${
                    notifications
                      ? "on"
                      : ""
                  }`}
                  onClick={() =>
                    setNotifications(
                      !notifications
                    )
                  }
                >
                  <span></span>
                </button>
              </div>

              <div className="setting-toggle-row">
                <span>
                  Email Alerts
                </span>

                <button
                  className={`toggle ${
                    emailAlerts
                      ? "on"
                      : ""
                  }`}
                  onClick={() =>
                    setEmailAlerts(
                      !emailAlerts
                    )
                  }
                >
                  <span></span>
                </button>
              </div>
            </div>
          </div>

          <div className="settings-card">
            <div className="settings-icon">
              🔐
            </div>

            <div className="settings-content">
              <h3>Security</h3>

              <p>
                Manage password and account
                security settings.
              </p>

              <button
                className="settings-btn"
                onClick={() =>
                  alert(
                    "Security settings opened!"
                  )
                }
              >
                Security Settings
              </button>
            </div>
          </div>

          <div className="settings-card">
            <div className="settings-icon">
              🎨
            </div>

            <div className="settings-content">
              <h3>Appearance</h3>

              <p>
                Customize the appearance of
                your HR Portal.
              </p>

              <button
                className="settings-btn"
                onClick={() =>
                  alert(
                    "Appearance settings opened!"
                  )
                }
              >
                Customize
              </button>
            </div>
          </div>

          <div className="settings-card">
            <div className="settings-icon">
              ⚙️
            </div>

            <div className="settings-content">
              <h3>
                System Settings
              </h3>

              <p>
                Manage general HR portal
                system preferences.
              </p>

              <button
                className="settings-btn"
                onClick={() =>
                  alert(
                    "System settings opened!"
                  )
                }
              >
                Manage System
              </button>
            </div>
          </div>

          <div className="settings-card">
            <div className="settings-icon">
              ❓
            </div>

            <div className="settings-content">
              <h3>
                Help & Support
              </h3>

              <p>
                Get help and support for your
                HR management system.
              </p>

              <button
                className="settings-btn"
                onClick={() =>
                  alert(
                    "Support: support@hrportal.com"
                  )
                }
              >
                Contact Support
              </button>
            </div>
          </div>

        </div>
      </>
    );
  };

  /* =========================
     LOGOUT
  ========================= */

  const handleLogout = () => {
    const confirmLogout =
      window.confirm(
        "Are you sure you want to logout?"
      );

    if (confirmLogout) {
      alert("Logout successful!");
      setActivePage("Dashboard");
    }
  };

  /* =========================
     PAGE SWITCH
  ========================= */

  const renderPage = () => {
    switch (activePage) {
      case "Employees":
        return renderEmployees();

      case "Attendance":
        return renderAttendance();

      case "Leave Management":
        return renderLeave();

      case "Payroll":
        return renderPayroll();

      case "Recruitment":
        return renderRecruitment();

      case "Settings":
        return renderSettings();

      default:
        return renderDashboard();
    }
  };

  /* =========================
     MAIN UI
  ========================= */

  return (
    <div className="app">

      {/* SIDEBAR */}

      <aside className="sidebar">

        <div className="logo">
          <div className="logo-icon">
            HR
          </div>

          <div>
            <h2>HR Portal</h2>
            <span>
              Management System
            </span>
          </div>
        </div>

        <nav>
          <p className="menu-title">
            MAIN MENU
          </p>

          {menuItems.map((item) => (
            <button
              key={item.name}
              className={`nav-item ${
                activePage === item.name
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setActivePage(item.name)
              }
            >
              <span>
                {item.icon}
              </span>

              {item.name}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">

          <button
            className={`nav-item ${
              activePage === "Settings"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setActivePage("Settings")
            }
          >
            <span>⚙️</span>
            Settings
          </button>

          <button
            className="nav-item logout-item"
            onClick={handleLogout}
          >
            <span>🚪</span>
            Logout
          </button>

        </div>
      </aside>

      {/* MAIN */}

      <main className="main-content">

        {/* TOPBAR */}

        <header className="topbar">

          <div className="mobile-logo">
            HR Portal
          </div>

          <div className="topbar-right">

            <div className="notification-wrapper">

              <button
                className="notification"
                onClick={() =>
                  setShowNotificationPanel(
                    !showNotificationPanel
                  )
                }
              >
                🔔
                <span className="notification-dot">
                  3
                </span>
              </button>

              {showNotificationPanel && (
                <div className="notification-panel">

                  <div className="notification-header">
                    <h3>
                      Notifications
                    </h3>

                    <span>
                      3 New
                    </span>
                  </div>

                  <div className="notification-item">
                    <div>🏖️</div>

                    <div>
                      <strong>
                        New Leave Request
                      </strong>

                      <p>
                        Karthik submitted a
                        sick leave request.
                      </p>

                      <small>
                        10 minutes ago
                      </small>
                    </div>
                  </div>

                  <div className="notification-item">
                    <div>👤</div>

                    <div>
                      <strong>
                        New Employee
                      </strong>

                      <p>
                        Employee profile was
                        recently added.
                      </p>

                      <small>
                        1 hour ago
                      </small>
                    </div>
                  </div>

                  <div className="notification-item">
                    <div>💰</div>

                    <div>
                      <strong>
                        Payroll Reminder
                      </strong>

                      <p>
                        Monthly payroll is
                        ready for processing.
                      </p>

                      <small>
                        2 hours ago
                      </small>
                    </div>
                  </div>

                  <button
                    className="all-notifications"
                    onClick={() => {
                      setShowNotificationPanel(
                        false
                      );
                      setActivePage(
                        "Leave Management"
                      );
                    }}
                  >
                    View All Notifications
                  </button>

                </div>
              )}

            </div>

            <div className="profile">
              <div className="profile-avatar">
                A
              </div>

              <div>
                <strong>
                  Admin User
                </strong>

                <span>
                  HR Manager
                </span>
              </div>

              <span className="arrow">
                ⌄
              </span>
            </div>

          </div>
        </header>

        {/* PAGE CONTENT */}

        <section className="content">
          {renderPage()}
        </section>

        {/* FOOTER */}

        <footer className="footer">
          <p>
            © 2026 HR Portal. All rights reserved.
          </p>

          <div>
            <span>
              Privacy
            </span>

            <span>
              Terms
            </span>

            <span>
              Support
            </span>
          </div>
        </footer>

      </main>

      {/* ADD EMPLOYEE MODAL */}

      {showEmployeeForm && (
        <div
          className="modal-overlay"
          onClick={() =>
            setShowEmployeeForm(false)
          }
        >
          <div
            className="employee-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="modal-header">
              <div>
                <h2>
                  Add Employee
                </h2>

                <p>
                  Enter employee information
                </p>
              </div>

              <button
                className="close-btn"
                onClick={() =>
                  setShowEmployeeForm(false)
                }
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={
                handleAddEmployee
              }
            >

              <div className="form-group">
                <label>
                  Employee Name
                </label>

                <input
                  type="text"
                  placeholder="Enter employee name"
                  value={
                    newEmployee.name
                  }
                  onChange={(e) =>
                    setNewEmployee({
                      ...newEmployee,
                      name:
                        e.target.value,
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label>
                  Job Role
                </label>

                <input
                  type="text"
                  placeholder="Enter job role"
                  value={
                    newEmployee.role
                  }
                  onChange={(e) =>
                    setNewEmployee({
                      ...newEmployee,
                      role:
                        e.target.value,
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label>
                  Department
                </label>

                <select
                  value={
                    newEmployee.department
                  }
                  onChange={(e) =>
                    setNewEmployee({
                      ...newEmployee,
                      department:
                        e.target.value,
                    })
                  }
                >
                  <option>IT</option>
                  <option>Design</option>
                  <option>Finance</option>
                  <option>Marketing</option>
                  <option>
                    Human Resources
                  </option>
                </select>
              </div>

              <div className="form-group">
                <label>
                  Monthly Salary
                </label>

                <input
                  type="number"
                  placeholder="Enter salary"
                  value={
                    newEmployee.salary
                  }
                  onChange={(e) =>
                    setNewEmployee({
                      ...newEmployee,
                      salary:
                        e.target.value,
                    })
                  }
                />
              </div>

              <div className="modal-actions">

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() =>
                    setShowEmployeeForm(
                      false
                    )
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="primary-btn"
                >
                  Add Employee
                </button>

              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;
 