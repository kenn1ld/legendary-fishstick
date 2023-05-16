export interface LastAnalysisResults {
  engine_name: string;
  method: string;
  scan_result_i: number;
  result: string;
}

export interface VirusTotalReport {
  id: string;
  attributes: {
    categories: {
      [vendor: string]: string;
    };
    registrar: string;
    whois: string;
    last_analysis_results: {
      [engine: string]: LastAnalysisResults;
    };
  };
}

export interface ApiResponse {
  data: VirusTotalReport;
}