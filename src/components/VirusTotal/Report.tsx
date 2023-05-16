import React from 'react';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import WarningIcon from '@mui/icons-material/Warning';
import { Box, Chip, Divider, Grid, Typography, Button } from '@mui/material';
import { green, red, orange } from '@mui/material/colors';
import { styled } from '@mui/system';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import { ApiResponse } from './VirusTotalTypes';

const ResultChip = styled(Chip)(({ theme }) => ({
  marginLeft: theme.spacing(1),
}));

interface ReportProps {
  report: ApiResponse;
}

const Report: React.FC<ReportProps> = ({ report }) => {
  const formattedWhois = formatWhois(report.data.attributes.whois);

  const exportToPDF = () => {
    const input = document.getElementById('report');
    if (!input) return;

    void html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4'); // Set the PDF page format: Portrait, unit: mm, size: A4
      const pageWidth = pdf.internal.pageSize.getWidth(); // get the width of the PDF page
      const pageHeight = pdf.internal.pageSize.getHeight(); // get the height of the PDF page
      const imgWidth = pageWidth - 20; // adjust the width based on margins
      const imgHeight = (canvas.height * imgWidth) / canvas.width; // maintain the aspect ratio

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight - 20;

      // Add new pages if the content is too large
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight - 20;
      }

      pdf.save('report.pdf');
    });
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography
          variant="h4"
          component="div"
          sx={{ fontWeight: 'bold', mt: 2, mb: 2 }}
        >
          Report for {report.data.id}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Button
          onClick={exportToPDF}
          variant="contained"
          color="primary"
          size="small"
        >
          Export to PDF
        </Button>
      </Grid>
      <Grid
        item
        xs={12}
        component={Box}
        sx={{
          p: 3,
          bgcolor: 'background.paper',
          borderRadius: 1,
          boxShadow: 1,
        }}
      >
        <Typography variant="h6" component="div" gutterBottom>
          <strong>Category:</strong>
        </Typography>
        {report.data.attributes.categories
          ? Object.entries(report.data.attributes.categories).map(
            ([vendor, category]) => (
              <Chip
                key={vendor}
                variant="outlined"
                size="small"
                label={`${vendor}: ${category}`}
                sx={{ mr: 1, mb: 1, fontStyle: 'italic' }}
              />
            )
          )
          : 'N/A'}
        <Divider sx={{ my: 3 }} />

        <Typography variant="subtitle1" gutterBottom>
          <strong>Registrar:</strong>{' '}
          {report.data.attributes.registrar || 'N/A'}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          <strong>WHOIS:</strong>
        </Typography>
        {formattedWhois
          ? formattedWhois.map((item, index) => (
            <Typography key={index} variant="body2">
              <strong>{item.label}:</strong> {item.value}
            </Typography>
          ))
          : 'N/A'}
        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" component="div" gutterBottom>
          <strong>Last Analysis Results:</strong>
        </Typography>
        <Grid container spacing={1}>
          {report.data.attributes.last_analysis_results &&
            Object.entries(report.data.attributes.last_analysis_results).map(
              ([engine, details]) => (
                <Grid item xs={12} sm={6} md={4} key={engine}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%', // Set the width to 100%
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 'bold',
                        paddingRight: '8px',
                        overflowWrap: 'break-word', // Enable word wrapping
                        wordWrap: 'break-word', // Enable word wrapping
                        fontSize: { xs: '0.875rem', sm: 'inherit' }, // Use a smaller font size for xs screens
                      }}
                    >
                      {engine} ({details.method})
                    </Typography>
                    <ResultChip
                      icon={
                        getResultChip(details.result) === 'clean' ? (
                          <CheckCircleOutlineIcon />
                        ) : getResultChip(details.result) === 'unrated' ? (
                          <WarningIcon />
                        ) : (
                          <ErrorOutlineIcon />
                        )
                      }
                      label={details.result}
                      size="small"
                      sx={{
                        backgroundColor:
                          getResultChip(details.result) === 'clean'
                            ? green[300]
                            : getResultChip(details.result) === 'unrated'
                              ? orange[300]
                              : red[300],
                        color:
                          getResultChip(details.result) === 'clean'
                            ? green[700]
                            : getResultChip(details.result) === 'unrated'
                              ? orange[700]
                              : red[700],
                      }}
                    />
                  </Box>
                </Grid>
              )
            )}
        </Grid>
      </Grid>
    </Grid>
  );
};

const formatWhois = (whois: string | null | undefined) => {
  if (!whois) return null;

  const lines = whois.split('\n');
  const formatted = lines
    .filter((line) => line.includes(':'))
    .map((line) => {
      const [label, ...valueParts] = line.split(':');
      const value = valueParts.join(':').trim();
      return { label, value };
    });

  return formatted;
};

const getResultChip = (result: string | null | undefined): string => {
  if (!result || result.toLowerCase() === 'unrated') {
    return 'unrated';
  }
  const resultText = result.toLowerCase();
  if (resultText === 'clean' || resultText === 'undetected') {
    return 'clean';
  }
  return 'malicious';
};

export default Report;
