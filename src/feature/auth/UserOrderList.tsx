import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import orderApi from "../../api/orderApi";
import {
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { OrderTypes } from "../../types/order";
import { TimeFormate } from "../../utils/timeFormat";
import { MoneyFormat } from "../../utils/moneyFormat";

export default function UserOrderList() {
  const [isLoading, setIsLoading] = useState(false);
  const [listOrder, setListOrder] = useState<OrderTypes[]>([]);

  const StatusTypeName = (status: number) => {
    let statusName = "";
    switch (status) {
      case 1:
        statusName = "Đặt hàng thành công";
        break;
      case 2:
        statusName = "Đã xác nhận";
        break;
      case 3:
        statusName = "Đang chuẩn bị hàng";
        break;
      case 4:
        statusName = "Đang giao";
        break;
      case 5:
        statusName = "Giao hàng thành công";
        break;
      case 6:
        statusName = "Đã hủy";
        break;
      default:
        statusName = "Đã xác nhận";
        break;
    }
    return statusName;
  };

  const StatusColor = (status: number) => {
    let color = "";
    let bgcColor = "";
    switch (status) {
      case 1:
        color = "#0f3460";
        bgcColor = "rgb(230, 230, 230)";
        break;
      case 2:
        color = "rgb(3, 184, 175)";
        bgcColor = "rgb(213, 241, 240)";
        break;
      case 3:
        color = "rgb(240, 140, 46)";
        bgcColor = "rgb(241, 200, 162)";
        break;
      case 4:
        color = "#33d067";
        bgcColor = "rgb(181, 246, 219)";
        break;
      case 5:
        color = "#33d067";
        bgcColor = "rgb(181, 246, 219)";
        break;
      case 6:
        color = "red";
        bgcColor = "rgb(247, 128, 122)";
        break;
      default:
        color = "#0f3460";
        bgcColor = "#ccc";
        break;
    }
    return { color, bgcColor };
  };

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setIsLoading(true);
        const response: any = await orderApi.getOrderUser();
        if (response.success) {
          setListOrder(response.data);
        }
        setIsLoading(false);
      } catch (error: any) {
        console.log(error.message);
      }
    };

    fetchOrder();
  }, []);

  const body = isLoading ? (
    <CircularProgress color="success" />
  ) : !listOrder.length ? (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ pb: 1 }}>
        Bạn chưa có đơn hàng nào.
      </Typography>
      <Link to="/" className="back">
        Đến ngay gian hàng để mua.
      </Link>
    </Box>
  ) : (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Mã đơn đặt</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Trạng thái</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Ngày đặt</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Giá tiền</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>
                Chi tiết đơn hàng
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listOrder.map((item, index) => {
              const quantity = item.order_details.reduce((acc, qty) => {
                return acc + qty.quantity;
              }, 0);
              return (
                <TableRow key={item._id}>
                  <TableCell>#{item._id.slice(0, 8)}</TableCell>
                  <TableCell>
                    <div
                      style={{
                        backgroundColor: StatusColor(item.status).bgcColor,
                        color: StatusColor(item.status).color,
                        borderRadius: 20,
                        textAlign: "center",
                        padding: "3px",
                      }}
                    >
                      {StatusTypeName(item.status)}
                    </div>
                  </TableCell>
                  <TableCell>{TimeFormate(item.createdAt)}</TableCell>
                  <TableCell>
                    <span style={{ color: "red", fontWeight: "bold" }}>
                      {MoneyFormat(item.total_amount)}
                    </span>{" "}
                    VND cho{" "}
                    <span style={{ fontWeight: "bold" }}>{quantity}</span> sản
                    phẩm
                  </TableCell>
                  <TableCell>
                    <Link to={`${item._id}`}>Xem chi tiết</Link>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );

  return body;
}
