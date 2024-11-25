import './App.css'
import{BrowserRouter,Routes,Route} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './component/protectedRoute/ProtectedRoute';
import Login from './pages/auth/Login';
import Studenttable from './component/studenttable/Studenttable';
import StudentView from './pages/studentview/StudentView';
import AddStudent from './pages/addtudent/AddStudent';
import Login1 from './pages/auth/Login1';
import Scheduletble from './component/scheduletable/Scheduletble';
import AddSchedule from './pages/addschedule/AddSchedule';
import ScheduleView from './pages/scheduleview/ScheduleView';
import AdminReg from './pages/adminreg/AdminReg';
import AdminLogin from './pages/auth/AdminLogin';
import Examtable from './component/examtable/Examtable';
import Marktable from './component/marktamble/Marktable';
import AddExam from './pages/addexam/AddExam';
import AddDocument from './pages/adddocument/AddDocument';
import DocumentTable from './component/documenttable/DocumentTable';
import DocumentView from './pages/documentView/DocumentView';
import CardTable from './component/cardtable/CardTable';
import AddCard from './pages/addcard/AddCard';
import CardView from './pages/cardview/CardView';
import AttendanceTable from './component/attendancetable/AttendanceTable';

function App() {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<ProtectedRoute/>}>
              <Route path='/studenttable' element={<Studenttable/>}/>
              <Route path='/studenttable/:studId' element={<StudentView/>}/>
              <Route path='/addStudent' element={<AddStudent/>}/>
              <Route path='/scheduletable' element={<Scheduletble/>}/>
              <Route path='/scheduletable/addschedule' element={<AddSchedule/>}/>
              <Route path='/scheduletable/:id' element={<ScheduleView/>}/>
              <Route path='/examtable' element={<Examtable/>}/>
              <Route path='/examtable/addExam' element={<AddExam/>}/>
              <Route path='/examtable/:examId' element={<Marktable/>}/>
              <Route path="/documenttable/:id" element={<DocumentView />} />
              <Route path="/documenttable/adddocument" element={<AddDocument />} />
              <Route path="/documenttable" element={<DocumentTable />} />
              <Route path="/cardtable" element={<CardTable />} />
              <Route path="/cardtable/addcard" element={<AddCard />} />
              <Route path="/cardtable/:id" element={<CardView />} />
              <Route path="/cardtable/attendanceTable/" element={<AttendanceTable />} />
            </Route>
            <Route path='/' element={<AdminLogin/>}/>
            <Route path='/register' element={<AdminReg/>}/>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  )
}

export default App
