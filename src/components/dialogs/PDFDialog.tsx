
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileText, Download } from "lucide-react";
import { downloadPDF, openPDFInNewTab } from "@/utils/pdf";

interface PDFDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  pdfUrl: string | null;
}

const PDFDialog = ({ isOpen, onOpenChange, pdfUrl }: PDFDialogProps) => {
  const handleDownloadPDF = () => {
    if (pdfUrl) {
      downloadPDF(pdfUrl, `pc-build-invoice-${Date.now()}.pdf`);
    }
  };

  const handleOpenPDFInNewTab = () => {
    if (pdfUrl) {
      openPDFInNewTab(pdfUrl);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Your PC Build Invoice</DialogTitle>
          <DialogDescription>
            You can download or open the PDF in a new tab.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 flex justify-center">
          {pdfUrl && (
            <div className="w-full h-[400px] border border-muted rounded-md overflow-hidden">
              <iframe 
                src={pdfUrl} 
                title="PC Build PDF Invoice" 
                className="w-full h-full" 
              />
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleOpenPDFInNewTab}>
            <FileText className="mr-2 h-4 w-4" />
            Open in New Tab
          </Button>
          <Button onClick={handleDownloadPDF}>
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PDFDialog;
