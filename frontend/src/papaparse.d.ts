declare module 'papaparse' {
    export interface ParseResult<T> {
      data: T[];
      errors: any[];
      meta: {
        delimiter: string;
        linebreak: string;
        aborted: boolean;
        truncated: boolean;
        cursor: number;
      };
    }
  
    export interface ParseConfig {
      delimiter?: string;
      newline?: string;
      quoteChar?: string;
      escapeChar?: string;
      header?: boolean;
      transformHeader?: ((header: string) => string) | undefined;
      dynamicTyping?: boolean | ((field: string | number) => boolean);
      preview?: number;
      encoding?: string;
      worker?: boolean;
      comments?: string | boolean;
      step?: (results: ParseResult<any>, parser: any) => void;
      complete?: (results: ParseResult<any>) => void;
      error?: (error: any, file?: File) => void;
      download?: boolean;
      downloadRequestHeaders?: { [key: string]: string };
      downloadRequestBody?: any;
      skipEmptyLines?: boolean | 'greedy';
      chunk?: (results: ParseResult<any>, parser: any) => void;
      fastMode?: boolean;
      beforeFirstChunk?: (chunk: string) => string | void;
      withCredentials?: boolean;
      transform?: (value: string, field: string | number) => any;
    }
  
    export function parse<T>(input: string | File, config?: ParseConfig): ParseResult<T>;
  }
  