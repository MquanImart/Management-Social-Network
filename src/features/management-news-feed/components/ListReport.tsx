import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";

interface Report {
    _idReporter: string;
    reason: string;
    reportDate: Date;
    status: string;
}

export interface ListReport {
    reports: Report[];
}
const ListReport = ({reports}: ListReport) => {

    return (
        <Box>
        <Typography variant="h5">Danh sách report</Typography>
        <Typography sx={{margin: '20px 0px'}} >Số lượng: {reports.length} </Typography>
        <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>User ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Reason</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reports.map((report) => (
              <TableRow key={report._idReporter}>
                <TableCell>{report._idReporter}</TableCell>
                <TableCell>{report.reason}</TableCell>
                <TableCell>{report.reportDate.toISOString()}</TableCell>
                <TableCell>
                  <Typography color={report.status === 'rejected' ? 'red' 
                    : (report.status === 'pending'? 'blue': 'green')}
                    > 
                    {report.status}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </TableContainer>
        </Box>
    )
}

export default ListReport;