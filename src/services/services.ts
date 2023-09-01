import axios from 'axios';

interface EmployeeData {
  employeeID: string;
  name: string;
  supervisor: string;
  descr: string;
  status: string;
}

export const getEmployeeData = async (emplid: string): Promise<EmployeeData> => {
  const url = `https://localhost:7063/AdminUser/GetData?emplid=${emplid}`;
  const response = await axios.get(url);
  return response.data;
};