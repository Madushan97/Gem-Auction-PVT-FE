import axios from "axios";
import { useEffect, useState } from "react";
import { format } from 'date-fns';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const ViewAuction = () => {
    const [auctions, setAuctions] = useState([]); // Default value is an empty array
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAuctions = async () => {
            const authToken = sessionStorage.getItem("token");
            if (!authToken) {
                setError("You are not authorized. Please log in.");
                return;
            }

            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/auction/getAll`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${authToken}`,
                    },
                });

                // Check if the response data contains the 'data' field
                if (response.data && Array.isArray(response.data.data)) {
                    setAuctions(response.data.data); // Set auctions from the 'data' field
                } else {
                    setError("Invalid data format received.");
                }
            } catch (err) {
                setError(err.response?.data?.message || "Failed to fetch auctions.");
            }
        };

        fetchAuctions();
    }, []);

    return (
        <TableContainer component={Paper}
        sx={{
            margin: '20px auto', // Center the table vertically and horizontally
            maxWidth: 2000,       // Limit the width of the table
            border: '3px solid black', // Add black border
            borderRadius: '8px', // Rounded corners for styling
            cursor: 'pointer'
        }}>
            <Table sx={{ minWidth: 650, margin: 'auto'}} aria-label="auction table">
                <TableHead>
                    <TableRow>
                        <TableCell align="right"><strong>ID</strong></TableCell>
                        <TableCell align="center"><strong>AUCTION NAME</strong></TableCell>
                        <TableCell align="center"><strong>DESCRIPTION</strong></TableCell>
                        <TableCell align="center"><strong>START DATE</strong></TableCell>
                        <TableCell align="center"><strong>END DATE</strong></TableCell>
                        <TableCell align="center"><strong>START PRICE</strong></TableCell>
                        <TableCell align="center"><strong>USER NAME</strong></TableCell>
                        <TableCell align="center"><strong>IS EXPIRED</strong></TableCell>
                    </TableRow>
                </TableHead>
    
                <TableBody>
                    {auctions.map((auction) => (
                        <TableRow key={auction.id} sx={{
                            '&:last-child td, &:last-child th': { border: 0 },
                            '&:hover': {
                                backgroundColor: '#f5f5f5', // Light grey hover color
                                cursor: 'pointer', // Change cursor to pointer
                            },
                        }}>
                            <TableCell align="right">{auction.id}</TableCell>
                            <TableCell align="center">{auction.auctionName}</TableCell>
                            <TableCell align="center">{auction.description}</TableCell>
                            <TableCell align="center">{format(new Date(auction.startDate), 'dd MMM yyyy, h:mm a')}</TableCell>
                            <TableCell align="center">{format(new Date(auction.endDate), 'dd MMM yyyy, h:mm a')}</TableCell>
                            <TableCell align="center">{auction.startPrice.toFixed(2)} LKR</TableCell>
                            <TableCell align="center">{auction.userName}</TableCell>
                            <TableCell align="center">{auction.expired ? "Yes" : "No"}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ViewAuction;
