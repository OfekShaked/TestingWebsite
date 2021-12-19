import React, { useState, useEffect, useContext } from "react";
import {
  Card,
  Stack,
  CardContent,
  Typography,
  CardHeader,
} from "@mui/material";
import CommonTable from "../../../common/table/CommonTable";
import axios from "axios";
import "./UserReportSelection.css";
import ActionButton from "../../../common/action_button/ActionButton";
import { logError } from "../../../../services/logger";
import { ErrorNotificationContext } from "../../../../contexts/ErrorNotificationContext";

const UserReportSelection = (props) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [userTests, setUserTests] = useState([]);
  const [avgGrade, setAvgGrade] = useState(0);
  const setErrorMesssage = useContext(ErrorNotificationContext);

  const loadUsers = async () => {
    try {
      const res = await axios.get("Users");
      if (res.data != null && res.status === 200) {
        let rows = res.data.map((user) => {
          return { ...user, id: user._id };
        });
        setUsers(rows);
      } else {
        setErrorMesssage(
          "Server error when loading users please reload and try again"
        );
      }
    } catch (err) {
      logError(err);
      setErrorMesssage("Unknown error when loading users");
    }
  };

  const onUserSelectedChange = async (value) => {
    setSelectedUser(value);
    try {
      const res = await axios.get(`UserReport/${value[0]}`);
      if (res.data != null && res.status === 200) {
        let rows = res.data.map((test) => {
          return { ...test, id: test._id };
        });
        setUserTests(rows);
        calculateAvgGrade(rows);
      } else {
        setErrorMesssage("Server error when loading user report");
      }
    } catch (err) {
      logError(err);
      setErrorMesssage("Unknown error when loading user report");
    }
  };

  const calculateAvgGrade = (tests) => {
    let sum = 0;
    tests.forEach((test) => {
      if (!isNaN(test.grade)) {
        sum += test.grade;
      }
    });
    setAvgGrade(sum / tests.length);
  };

  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  const openTestReport = (id) => {
    openInNewTab(`${window.location.origin}/TestReport/${id}`);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const userColumns = [
    {
      field: "name",
      valueGetter: (params) => {
        return `${params.row.name.first} ${params.row.name.last}`;
      },
      headerName: "Respondent",
      flex: 1,
    },
    {
      field: "_id",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "last_updated",
      headerName: "Last Modified",
      flex: 1,
    },
  ];

  const testColumns = [
    {
      field: "_id",
      headerName: "Test ID",
      valueGetter: (params) => {
        return params.row.test_id._id;
      },
      flex: 1,
    },
    {
      field: "name",
      headerName: "Test Name",
      valueGetter: (params) => {
        return params.row.test_id.name;
      },
      flex: 1,
    },
    {
      field: "grade",
      headerName: "Grade",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "Last activity",
      flex: 1,
    },
    {
      field: "user",
      headerName: "Actions",
      renderCell: (params) => {
        return (
          <ActionButton onClick={() => openTestReport(params.row._id)}>
            Go
          </ActionButton>
        );
      },
      disableClickEventBubbling: true,
      flex: 1,
    },
  ];

  return (
    <>
      <Card>
        <CardHeader title="Report by Name" />
        <CardContent>
          <Stack>
            <Typography variant="h6">Find a respondent</Typography>
            <div className="table-container">
              <div className="user-table">
                <CommonTable
                  columns={userColumns}
                  rows={users}
                  onSelectionModelChange={onUserSelectedChange}
                  selectionModel={selectedUser}
                />
              </div>
            </div>
            <Typography variant="h6" gutterBottom>
              Activity Report For:{" "}
              {selectedUser.length > 0 ? selectedUser[0] : ""}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Average grade: {Math.round(avgGrade)}
            </Typography>
            <div className="table-container">
              <div className="test-table">
                <CommonTable columns={testColumns} rows={userTests} />
              </div>
            </div>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
};
export default UserReportSelection;
