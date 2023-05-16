import React from 'react';
import {
  Box,
  Typography,
  Chip,
  Divider,
  Grid,
  Button,
} from '@mui/material';
import { ApiResponse } from './VirusTotalTypes';
import { green, red, orange } from '@mui/material/colors';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface ReportProps {
  report: ApiResponse;
}

const Report: React.FC<ReportProps> = ({ report }) => {
  const formattedWhois = formatWhois(report.data.attributes.whois);

  const exportToPDF = () => {
  const input = document.getElementById("report");
  if (!input) return;

  html2canvas(input).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4"); // Set the PDF page format: Portrait, unit: mm, size: A4
    const pageWidth = pdf.internal.pageSize.getWidth(); // get the width of the PDF page
    const pageHeight = pdf.internal.pageSize.getHeight(); // get the height of the PDF page
    const imgWidth = pageWidth - 20; // adjust the width based on margins
    const imgHeight = (canvas.height * imgWidth) / canvas.width; // maintain the aspect ratio

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
    heightLeft -= pageHeight - 20;

    // Add new pages if the content is too large
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight - 20;
    }

    pdf.save("report.pdf");
  });
};

  return (
    <Grid container>
      <Grid item xs={12} sm={6}>
        <Typography
          variant="h4"
          component="div"
          sx={{ fontWeight: 'bold', mt: 2, mb: 2 }}
        >
          Report for {report.data.id}
        </Typography>
      </Grid>
      <Grid
        container
        item
        xs={12}
        sm={6}
        justifyContent="flex-end"
        alignItems="center"
      >
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
        id="report"
        component={Box}
        sx={{
          mt: 4,
          boxShadow: 2,
          borderRadius: 2,
          p: 3,
          bgcolor: 'background.paper',
        }}
      >
        <Typography variant="h6" component="div" gutterBottom sx={{ mb: 2 }}>
          <Box
            component="span"
            sx={{
              borderBottom: '3px solid currentColor',
              paddingBottom: '0.25rem',
            }}
          >
            Category:
          </Box>{' '}
          {report.data.attributes.categories ? (
            Object.entries(report.data.attributes.categories).map(
              ([vendor, category]) => (
                <Chip
                  key={vendor}
                  variant="outlined"
                  size="small"
                  label={`${vendor}: ${category}`}
                  sx={{ mr: 1, mb: 1, fontStyle: 'italic' }}
                />
              ),
            )
          ) : (
            'N/A'
          )}
        </Typography>
        <Divider />
        <Typography
          variant="body1"
          component="div"
          gutterBottom
          sx={{ mt: 2, mb: 1 }}
        >
          <Box component="span" fontWeight="bold">
            Registrar:
          </Box>{' '}
          {report.data.attributes.registrar || 'N/A'}
        </Typography>
        <Typography variant="body1">
          <Box component="span" fontWeight="bold">
            WHOIS:
          </Box>{' '}
          {formattedWhois ? (
            formattedWhois.map((item, index) => (
              <div key={index}>
                <strong>{item.label}:</strong> {item.value}
              </div>
            ))
          ) : (
            'N/A'
          )}
        </Typography>
        <Typography
          variant="h6"
          component="div"
          gutterBottom
          sx={{ fontWeight: 'bold', mt: 2, mb: 2 }}
        >
          Last Analysis Results:
        </Typography>
        <Divider />
        {report.data.attributes.last_analysis_results &&
          Object.entries(report.data.attributes.last_analysis_results).map(
            ([engine, details]) => (
              <Box
                key={engine}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  py: 1,
                }}
              >
                <Box component="span">
                  {engine} ({details.method})
                </Box>
                <Box
                  component="span"
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  {getResultChip(details.result)}
                </Box>
              </Box>
            ),
          )}
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

const getResultChip = (result: string | null | undefined): JSX.Element => {
  if (!result || result.toLowerCase() === 'unrated') {
    return (
      <Chip
        icon={<WarningIcon />}
        label="Unrated"
        size="small"
        sx={{ backgroundColor: orange[100], color: orange[700] }}
      />
    );
  }
  const resultText = result.toLowerCase();
  switch (resultText) {
    case 'clean':
    case 'undetected':
      return (
        <Chip
          icon={<CheckCircleOutlineIcon />}
          label={result}
          size="small"
          sx={{ backgroundColor: green[100], color: green[700] }}
        />
      );
    default:
      return (
        <Chip
          icon={<ErrorOutlineIcon />}
          label={result}
          size="small"
          sx={{ backgroundColor: red[100], color: red[700] }}
        />
      );
  }
};

export default Report;