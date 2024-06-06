import { Student } from './Student';
import { Teacher } from './Teacher';

export interface Report {
  id: number;
  date: string;
  name: string;
  authors: Student[];
  supervisor: Teacher;
  abstract: string;
  resume: string;
  keywords: string[];
  file: string;
  type: string;
}
