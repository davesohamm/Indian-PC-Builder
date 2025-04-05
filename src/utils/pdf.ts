
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { PCBuild, ComponentCategory } from '@/types/pc-builder';
import { getComponentById, getCategoryLabel } from '@/data/pc-components';

export const generatePDF = (
  currentBuild: PCBuild,
  buildName: string | null,
  userName: string | null,
  userEmail: string | null
): string => {
  // Create a new PDF document
  const doc = new jsPDF();
  
  // Set document properties
  doc.setProperties({
    title: buildName || 'PC Build',
    subject: 'PC Build Invoice',
    author: 'Indian PC Builder',
    creator: 'Indian PC Builder'
  });
  
  // Add header
  doc.setFontSize(20);
  doc.setTextColor(30, 64, 175); // primary color
  doc.text('Indian PC Builder', 105, 20, { align: 'center' });
  
  // Add build name
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text(buildName || 'Custom PC Build', 105, 30, { align: 'center' });
  
  // Add date
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 105, 35, { align: 'center' });
  
  // Add user information
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text('User Details:', 14, 45);
  
  if (userName || userEmail) {
    doc.setFontSize(10);
    if (userName) {
      doc.text(`Name: ${userName}`, 14, 50);
    }
    if (userEmail) {
      doc.text(`Email: ${userEmail}`, 14, userName ? 55 : 50);
    }
  } else {
    doc.setFontSize(10);
    doc.text('Guest User', 14, 50);
  }
  
  // Prepare component data for the table
  const tableData: Array<[string, string, string]> = [];
  let totalPrice = 0;
  
  Object.entries(currentBuild).forEach(([category, componentId]) => {
    if (!componentId) return;
    
    const component = getComponentById(category as ComponentCategory, componentId);
    if (!component) return;
    
    const price = component.price;
    totalPrice += price;
    
    tableData.push([
      getCategoryLabel(category as ComponentCategory),
      component.name,
      `₹${price.toLocaleString('en-IN')}`
    ]);
  });
  
  // Add components table
  autoTable(doc, {
    head: [['Component', 'Name', 'Price']],
    body: tableData,
    startY: userName || userEmail ? 60 : 55,
    headStyles: {
      fillColor: [30, 64, 175],
      textColor: [255, 255, 255]
    },
    alternateRowStyles: {
      fillColor: [240, 240, 240]
    },
    margin: { top: 60 }
  });
  
  // Add total
  const finalY = (doc as any).lastAutoTable.finalY + 10;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text(`Total: ₹${totalPrice.toLocaleString('en-IN')}`, 195, finalY, { align: 'right' });
  
  // Add footer
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 100);
  doc.text('Thanks for using Indian PC Builder', 105, 285, { align: 'center' });
  doc.text('Created by Soham Dave', 105, 290, { align: 'center' });
  
  // Generate PDF as data URL
  return doc.output('dataurlstring');
};

export const downloadPDF = (dataUrl: string, filename: string): void => {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  link.click();
};

export const openPDFInNewTab = (dataUrl: string): void => {
  window.open(dataUrl, '_blank');
};
