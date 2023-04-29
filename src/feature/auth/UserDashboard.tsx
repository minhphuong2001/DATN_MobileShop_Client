import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { UserProps } from "../../types/user";

export default function UserDashboard() {
  const user: UserProps = useSelector((state: any) => state.auth.user);

  return (
    <div className="UserDashboard">
      <Typography
        component="h5"
        variant="h5"
        style={{ paddingBottom: 10, fontWeight: 'bold' }}
      >
        Thông tin của tôi
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold'}}>Họ tên</TableCell>
              <TableCell sx={{ fontWeight: 'bold'}}>Email</TableCell>
              <TableCell sx={{ fontWeight: 'bold'}}>Số điện thoại</TableCell>
              <TableCell sx={{ fontWeight: 'bold'}}>Địa chỉ</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{user.fullname ? user.fullname : ''}</TableCell>
              <TableCell>{user.email ? user.email : ''}</TableCell>
              <TableCell>{user.phone ? user.phone : ''}</TableCell>
              <TableCell>{user.address ? user.address : ''}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
