import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, Calendar, User, Search, ChevronLeft, ChevronDown, Eye, EyeOff, 
  Bell, LogOut, Star, MessageCircle, Clock, Phone, Video, 
  MessageSquare, Home, Filter, Stethoscope, BriefcaseMedical,
  Activity, Pill, Scissors, Baby, ChevronRight, FileText, MapPin,
  Settings, SlidersHorizontal, CheckCircle2, Lightbulb, Wallet, Lock, HelpCircle, Key, UserX, Pencil, Save,
  Paperclip, Mic, Send, Play, CreditCard, Smartphone, Check
} from 'lucide-react';

const doctors = [
  { 
    id: 1, name: 'ThS. BS. Nguyễn Mai Anh', specialty: 'Da liễu - Nội tiết', rate: 5, reviews: 60, patients: '2,000+', img: '/bs_mai_anh.png', experience: '15+', schedule: 'Mon-Sat / 9:00AM - 5:00PM',
    intro: 'ThS. BS. Nguyễn Mai Anh là chuyên gia đầu ngành trong lĩnh vực Da liễu với hơn 15 năm kinh nghiệm làm việc tại các bệnh viện lớn. Bác sĩ luôn tận tâm và ưu tiên sức khỏe bệnh nhân lên hàng đầu.',
    workHistory: 'Bác sĩ từng có thời gian công tác tại Khoa Da liễu - Bệnh viện Da liễu Trung ương, Bệnh viện Bạch Mai.',
    expertise: 'Chuyên chẩn đoán, tầm soát và điều trị các bệnh lý da liễu mãn tính.', gender: 'female'
  },
  { 
    id: 2, name: 'TS. BS. Trần Hoàng Bách', specialty: 'Da liễu - Di truyền', rate: 4.5, reviews: 40, patients: '1,500+', img: '/bs_hoang_bach.png', experience: '12+', schedule: 'Tue-Sun / 10:00AM - 6:00PM',
    intro: 'TS. BS. Trần Hoàng Bách là tiến sĩ chuyên ngành Di truyền Da liễu, nổi tiếng với các phương pháp chẩn đoán hiện đại.',
    workHistory: 'Từng công tác tại Khoa Di truyền - Bệnh viện Nhi Trung ương.',
    expertise: 'Điều trị các bệnh lý da liễu di truyền, rối loạn sắc tố.', gender: 'male'
  },
  { 
    id: 3, name: 'BS. CKI. Phạm Thu Trang', specialty: 'Da liễu Thẩm mỹ', rate: 5, reviews: 150, patients: '3,500+', img: '/bs_thu_trang.png', experience: '10+', schedule: 'Mon-Sat / 8:00AM - 5:00PM',
    intro: 'ThS. BS. Thu Trang là bác sĩ thẩm mỹ da liễu hàng đầu với hơn 10 năm kinh nghiệm trong trẻ hóa da.',
    workHistory: 'Đã công tác tại các trung tâm thẩm mỹ uy tín ở Hàn Quốc và Việt Nam.',
    expertise: 'Chuyên làm đẹp da, laser điều trị, nâng cơ mặt.', gender: 'female'
  },
  { 
    id: 4, name: 'BS. CKII. Lê Văn Hoàng', specialty: 'Bệnh lý Da liễu', rate: 4.8, reviews: 90, patients: '4,000+', img: '/bs_van_hoang.png', experience: '18+', schedule: 'Wed-Sun / 9:30AM - 5:30PM',
    intro: 'BS. CKII. Lê Văn Hoàng là chuyên gia bệnh lý da liễu với 18 năm kinh nghiệm thực chiến.',
    workHistory: 'Từng làm việc tại Khoa Bệnh lý Ngoài da - Bệnh viện Đại học Y Dược TP.HCM.',
    expertise: 'Điều trị viêm da tiếp xúc, chàm, vảy nến.', gender: 'male'
  },
];

const steps = [
  { title: 'MedicalCare', desc: 'Hệ thống đặt lịch khám và chăm sóc sức khỏe trực tuyến hiện đại nhất hiện nay.' },
  { title: 'Nhanh Chóng', desc: 'Tìm kiếm bác sĩ chuyên khoa và đặt lịch khám trong vài thao tác cơ bản.' },
  { title: 'Bảo Mật', desc: 'Thông tin cá nhân và hồ sơ bệnh án được bảo vệ an toàn với công nghệ tiên tiến.' },
];

const BottomNavigation = ({ view, setView, selectedDoctor }) => (
  <div className="absolute bottom-6 left-6 right-6 h-[56px] bg-[#2f6bff] rounded-[28px] flex justify-around items-center px-4 z-50 shadow-xl shadow-[#2f6bff]/20">
    <button onClick={() => setView('home')} className="p-2 text-white hover:text-white transition-colors">
      <Home size={22} strokeWidth={view === 'home' ? 2.5 : 2} className={view === 'home' ? 'opacity-100' : 'opacity-70'} />
    </button>
    <button onClick={() => { if(selectedDoctor) setView('chat'); else alert('Vui lòng chọn bác sĩ để nhắn tin!'); }} className="p-2 text-white hover:text-white transition-colors">
      <MessageCircle size={22} strokeWidth={view === 'chat' ? 2.5 : 2} className={view === 'chat' ? 'opacity-100' : 'opacity-70'} />
    </button>
    <button onClick={() => setView('myProfile')} className="p-2 text-white hover:text-white transition-colors">
      <User size={22} strokeWidth={['myProfile', 'editProfile', 'settings'].includes(view) ? 2.5 : 2} className={['myProfile', 'editProfile', 'settings'].includes(view) ? 'opacity-100' : 'opacity-70'} />
    </button>
    <button onClick={() => setView('myAppointments')} className="p-2 text-white hover:text-white transition-colors">
      <Calendar size={22} strokeWidth={view === 'myAppointments' ? 2.5 : 2} className={view === 'myAppointments' ? 'opacity-100' : 'opacity-70'} />
    </button>
  </div>
);

export default function App() {
  const [view, setView] = useState('onboarding');
  const [stepIndex, setStepIndex] = useState(0);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  
  // Auth state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({ fullName: 'Thế Kiệt', email: 'kiet@mail.com' }); 

  // Form states
  const [fullName, setFullName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [resetEmail, setResetEmail] = useState('');

  // Booking state 
  const [selectedMonth, setSelectedMonth] = useState(3); 
  const [selectedDate, setSelectedDate] = useState(24);
  const [selectedTime, setSelectedTime] = useState('10:00 AM');
  const [patientType, setPatientType] = useState('relative');
  const [patientName, setPatientName] = useState('Lan');
  const [patientAge, setPatientAge] = useState('30');
  const [gender, setGender] = useState('Nữ');
  const [symptoms, setSymptoms] = useState('Gần đây da mặt xuất hiện nhiều nốt mẩn đỏ, ngứa ngáy và có dấu hiệu bong tróc ở vùng hai bên má. Tình trạng này đã kéo dài khoảng 1 tuần, có bôi kem dưỡng ẩm nhưng không thấy thuyên giảm.');

  // Payment states (MỚI THÊM)
  const [paymentOption, setPaymentOption] = useState('credit');
  const [cardName, setCardName] = useState('Thế Kiệt');
  const [cardNumber, setCardNumber] = useState('000 000 000 00');
  const [cardExpiry, setCardExpiry] = useState('04/28');
  const [cardCvv, setCardCvv] = useState('0000');

  const monthsLabel = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const getDaysInMonth = (month, year = 2026) => {
    const date = new Date(year, month, 1);
    const days = [];
    while (date.getMonth() === month) {
      days.push({ d: date.getDate(), day: daysOfWeek[date.getDay()] });
      date.setDate(date.getDate() + 1);
    }
    return days;
  };
  const monthDays = getDaysInMonth(selectedMonth);

  const scrollDateSlider = (direction) => {
    const container = document.getElementById('booking-date-slider');
    if(container) container.scrollBy({ left: direction * 120, behavior: 'smooth' });
  };

  // Filter state
  const [appointmentTab, setAppointmentTab] = useState('Sắp Tới'); // Đổi mặc định sang Sắp Tới để test
  const [sortType, setSortType] = useState('A-Z'); 
  const [cancelReason, setCancelReason] = useState('Thời Tiết Xấu / Khó Di Chuyển');
  const [otherCancelReason, setOtherCancelReason] = useState('');
  const [rating, setRating] = useState(4);
  const [reviewText, setReviewText] = useState('');
  const [favoriteTab, setFavoriteTab] = useState('doctors');
  const [expandedService, setExpandedService] = useState('Nội tiết Da liễu');
  
  // Settings
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [notifications, setNotifications] = useState({ chung: true, amThanh: true, amThanhCuocGoi: true, rung: false, uuDai: false, thanhToan: true, khuyenMai: false, hoanTien: true });
  const [passState, setPassState] = useState({ current: '', new: '', confirm: '', showCurrent: false, showNew: false, showConfirm: false });

  // Chat State
  const chatEndRef = useRef(null);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { text: 'chào bác sĩ, dạo gần đây da mặt tôi bị nổi nhiều mẩn đỏ và có cảm giác ngứa rát. tôi vẫn dùng kem dưỡng như cũ nhưng không thấy thuyên giảm. bác sĩ tư vấn giúp tôi với ạ.', sender: 'user', time: '09:00' },
    { text: 'chào bạn, triệu chứng này xuất hiện bao lâu rồi? bạn có đổi loại mỹ phẩm nào mới hay ăn món gì dễ dị ứng trong mấy ngày qua không? bạn chụp vùng da đó gửi tôi xem nhé.', sender: 'doctor', time: '09:30' },
    { text: 'tình trạng này bắt đầu từ khoảng 3 ngày trước ạ. tôi không dùng mỹ phẩm lạ nhưng dạo này công việc hơi áp lực nên tôi thức khuya nhiều. để tôi chụp ảnh gửi bác sĩ ạ.', sender: 'user', time: '09:43' },
    { audio: true, sender: 'doctor', time: '09:50', duration: '02:30' },
    { text: 'dạ vâng, tôi nghe rõ rồi. tôi sẽ đặt lịch đến phòng khám để kiểm tra trực tiếp. cảm ơn bác sĩ nhiều ạ.', sender: 'user', time: '09:55' }
  ]);

  useEffect(() => {
    if (view === 'chat') chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, view]);

  const handleSendChat = () => {
    if (chatInput.trim()) {
      setChatMessages([...chatMessages, { text: chatInput, sender: 'user', time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }]);
      setChatInput('');
    }
  };

  const [favoriteDoctors, setFavoriteDoctors] = useState([]);
  const handleToggleFavorite = (e, doctorId) => {
    e.stopPropagation(); 
    if (favoriteDoctors.includes(doctorId)) setFavoriteDoctors(favoriteDoctors.filter(id => id !== doctorId)); 
    else setFavoriteDoctors([...favoriteDoctors, doctorId]); 
  };

  const [homeDate, setHomeDate] = useState(11);
  const homeDatesList = [ { d: 9, m: 'MON' }, { d: 10, m: 'TUE' }, { d: 11, m: 'WED' }, { d: 12, m: 'THU' }, { d: 13, m: 'FRI' }, { d: 14, m: 'SAT' } ];

  const handleLogin = () => {
    if (!email || !password) return alert('Vui lòng nhập thông tin!');
    setUser({ fullName: email.split('@')[0], email });
    setView('home');
  };

  const handleSignup = () => {
    alert('Đăng ký thành công!');
    setView('login');
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center sm:p-6 font-sans">
      <div className="w-full h-[100dvh] sm:w-[390px] sm:h-[844px] bg-slate-50 sm:rounded-[40px] sm:shadow-2xl overflow-hidden relative flex flex-col items-stretch ring-1 ring-slate-200">
        
        <AnimatePresence mode="wait">
          
          {/* 1. ONBOARDING */}
          {view === 'onboarding' && (
             <motion.div key="onboarding" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex flex-col items-center bg-gradient-to-b from-blue-600 to-indigo-800 pt-20 px-6 pb-12">
               <div className="bg-white p-6 rounded-3xl shadow-2xl shadow-blue-900/50 mb-6">
                 <img src="/logo.png" alt="Logo" className="w-16 h-16 object-contain drop-shadow-sm" />
               </div>
               <span className="text-blue-100 font-bold tracking-[0.2em] text-xs mb-auto">DERMATOLOGY CARE</span>
               <div className="w-full bg-white rounded-[32px] p-8 shadow-2xl text-center relative mt-auto border border-blue-50">
                 <div className="flex justify-center gap-2 mb-8">
                   {steps.map((_, i) => ( <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === stepIndex ? 'w-8 bg-blue-600' : 'w-2 bg-blue-100'}`} /> ))}
                 </div>
                 <h1 className="text-2xl font-extrabold text-slate-900 mb-3">{steps[stepIndex].title}</h1>
                 <p className="text-slate-500 text-sm leading-relaxed mb-8 px-2">{steps[stepIndex].desc}</p>
                 <div className="flex gap-4">
                   <button onClick={() => setView('login')} className="flex-1 py-4.5 rounded-2xl font-bold text-slate-500 bg-slate-100 hover:bg-slate-200 transition-colors">Bỏ qua</button>
                   <button onClick={() => stepIndex < steps.length - 1 ? setStepIndex(prev => prev + 1) : setView('login')} className="flex-1 py-4.5 rounded-2xl font-bold text-white bg-blue-600 shadow-lg shadow-blue-600/30 hover:bg-blue-700 transition-colors">
                     Tiếp tục
                   </button>
                 </div>
               </div>
             </motion.div>
          )}

          {/* 2. LOGIN */}
          {view === 'login' && (
             <motion.div key="login" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 flex flex-col bg-white p-6 pt-16 overflow-y-auto">
               <button onClick={() => setView('onboarding')} className="w-12 h-12 flex items-center justify-center rounded-2xl bg-slate-50 text-slate-600 mb-10 hover:bg-slate-100 transition-colors"><ChevronLeft size={24} /></button>
               <h2 className="text-3xl font-extrabold text-slate-900 mb-3">Chào mừng bạn 👋</h2>
               <p className="text-slate-500 mb-10 text-sm">Đăng nhập để đặt lịch khám ngay!</p>
               <div className="space-y-6">
                 <div>
                   <label className="block text-sm font-bold text-slate-700 mb-2">Email / Số điện thoại</label>
                   <input type="text" placeholder="example@mail.com" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-5 py-4.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-slate-800" />
                 </div>
                 <div>
                   <label className="block text-sm font-bold text-slate-700 mb-2">Mật khẩu</label>
                   <div className="relative">
                     <input type={showPassword ? "text" : "password"} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-5 py-4.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-slate-800 pr-12" />
                     <button onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">{showPassword ? <EyeOff size={22} /> : <Eye size={22} />}</button>
                   </div>
                   <div className="text-right mt-4"><span onClick={() => setView('forgotPassword')} className="text-sm font-bold text-blue-600 cursor-pointer hover:text-blue-700 transition-colors">Quên mật khẩu?</span></div>
                 </div>
               </div>
               <button onClick={handleLogin} className="w-full py-4.5 bg-blue-600 hover:bg-blue-700 transition-colors text-white rounded-2xl font-bold mt-10 shadow-xl shadow-blue-600/20 text-lg">Đăng Nhập</button>
               <div className="mt-auto text-center pb-8 pt-8">
                 <span className="text-slate-500 text-sm font-medium">Chưa có tài khoản? </span>
                 <span onClick={() => setView('signup')} className="text-blue-600 font-bold text-sm cursor-pointer hover:underline underline-offset-4">Đăng ký ngay</span>
               </div>
             </motion.div>
          )}

          {/* 3. SIGNUP */}
          {view === 'signup' && (
             <motion.div key="signup" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 flex flex-col bg-white overflow-hidden pb-6 relative">
                <div className="pt-[44px] pb-2 px-5 shrink-0 flex items-center relative">
                  <button onClick={() => setView('login')} className="w-8 h-8 flex items-center justify-center text-[#2f6bff] z-10"><ChevronLeft size={28} strokeWidth={2.5} /></button>
                  <h2 className="text-[#2f6bff] font-extrabold text-[20px] absolute w-full text-center left-0 right-0">Tạo Tài Khoản Mới</h2>
                </div>
                <div className="flex-1 overflow-y-auto px-6 space-y-4 [&::-webkit-scrollbar]:hidden mt-2">
                  <div className="flex flex-col gap-1.5"><label className="text-[14px] font-extrabold text-slate-900">Họ và tên</label><input type="text" value={fullName} onChange={e=>setFullName(e.target.value)} placeholder="Nguyễn Văn A" className="w-full bg-[#EEF2FF] border-none rounded-[16px] px-5 py-[14px] text-[13px] font-semibold text-[#8baeff] placeholder-[#8baeff] outline-none focus:ring-2 focus:ring-[#2f6bff]/20" /></div>
                  <div className="flex flex-col gap-1.5">
                      <label className="text-[14px] font-extrabold text-slate-900">Mật Khẩu</label>
                      <div className="relative">
                        <input type={showSignupPassword ? "text" : "password"} value={signupPassword} onChange={e=>setSignupPassword(e.target.value)} placeholder="*************" className="w-full bg-[#EEF2FF] border-none rounded-[16px] px-5 py-[14px] text-[13px] font-semibold text-[#8baeff] placeholder-[#8baeff] outline-none focus:ring-2 focus:ring-[#2f6bff]/20 pr-12 tracking-widest" />
                        <button onClick={() => setShowSignupPassword(!showSignupPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-800">{showSignupPassword ? <Eye size={18} /> : <EyeOff size={18} />}</button>
                      </div>
                  </div>
                  <div className="flex flex-col gap-1.5"><label className="text-[14px] font-extrabold text-slate-900">Email</label><input type="email" value={signupEmail} onChange={e=>setSignupEmail(e.target.value)} placeholder="example@mail.com" className="w-full bg-[#EEF2FF] border-none rounded-[16px] px-5 py-[14px] text-[13px] font-semibold text-[#8baeff] placeholder-[#8baeff] outline-none focus:ring-2 focus:ring-[#2f6bff]/20" /></div>
                  <div className="flex flex-col gap-1.5"><label className="text-[14px] font-extrabold text-slate-900">Số điện thoại</label><input type="tel" value={phone} onChange={e=>setPhone(e.target.value)} placeholder="0987..." className="w-full bg-[#EEF2FF] border-none rounded-[16px] px-5 py-[14px] text-[13px] font-semibold text-[#8baeff] placeholder-[#8baeff] outline-none focus:ring-2 focus:ring-[#2f6bff]/20" /></div>
                  <div className="flex flex-col gap-1.5"><label className="text-[14px] font-extrabold text-slate-900">Ngày Sinh</label><input type="text" value={dob} onChange={e=>setDob(e.target.value)} placeholder="DD / MM / YYYY" className="w-full bg-[#EEF2FF] border-none rounded-[16px] px-5 py-[14px] text-[13px] font-semibold text-[#8baeff] placeholder-[#8baeff] outline-none focus:ring-2 focus:ring-[#2f6bff]/20" /></div>
                  <div className="pt-2 text-center flex flex-col items-center pb-8">
                    <p className="text-[9px] text-slate-600 font-semibold mb-4 px-8 leading-tight">Bằng việc tiếp tục, bạn đồng ý với Điều khoản sử dụng<br/>và Chính sách bảo mật</p>
                    <button onClick={() => {alert('Đăng ký thành công!'); setView('login');}} className="bg-[#2f6bff] hover:bg-blue-700 transition-colors text-white rounded-[30px] py-[10px] px-10 font-extrabold text-[15px] shadow-lg shadow-[#2f6bff]/30 leading-[1.2] flex flex-col items-center"><span>Tạo Tài Khoản</span><span>Mới</span></button>
                    <div className="text-[11px] font-bold text-slate-500 mt-6">Đã có tài khoản? <span onClick={() => setView('login')} className="text-[#2f6bff] cursor-pointer">Đăng nhập</span></div>
                  </div>
                </div>
             </motion.div>
          )}

          {/* 4. FORGOT PASSWORD */}
          {view === 'forgotPassword' && (
             <motion.div key="forgotPassword" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 flex flex-col bg-white overflow-hidden pb-6 relative">
                <div className="pt-[44px] pb-2 px-5 shrink-0 flex items-center relative">
                  <button onClick={() => setView('login')} className="w-8 h-8 flex items-center justify-center text-[#2f6bff] z-10"><ChevronLeft size={28} strokeWidth={2.5} /></button>
                  <h2 className="text-[#2f6bff] font-extrabold text-[20px] absolute w-full text-center left-0 right-0">Quên Mật Khẩu</h2>
                </div>
                <div className="px-8 mt-2 mb-10"><p className="text-slate-900 text-[12px] font-extrabold text-center">Vui Lòng Nhập Email Để Nhận Mã Khôi Phục.</p></div>
                <div className="px-6 space-y-8">
                  <div className="flex flex-col gap-1.5">
                      <label className="text-[15px] font-extrabold text-slate-900">Email</label>
                      <input type="email" value={resetEmail} onChange={e=>setResetEmail(e.target.value)} placeholder="example@mail.com" className="w-full bg-[#EEF2FF] border-none rounded-[16px] px-5 py-[14px] text-[13px] font-semibold text-[#8baeff] placeholder-[#8baeff] outline-none focus:ring-2 focus:ring-[#2f6bff]/20" />
                  </div>
                  <div className="flex justify-center mt-6">
                    <button onClick={() => {alert('Đã gửi mã khôi phục!'); setView('login');}} className="w-[85%] py-[12px] bg-[#2f6bff] hover:bg-blue-700 transition-colors text-white rounded-full font-extrabold text-[18px] shadow-lg shadow-[#2f6bff]/30">Gửi Mã</button>
                  </div>
                </div>
             </motion.div>
          )}

          {/* 5. HOME */}
          {view === 'home' && (
             <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex flex-col bg-white overflow-hidden scrollbar-hide">
               {/* Top Section */}
               <div className="px-5 pt-12 pb-6 shrink-0 bg-white z-10 relative">
                 <div className="flex justify-between items-center mb-6">
                   <div className="flex items-center gap-3">
                     <img src="/avatar_user.png" className="w-[42px] h-[42px] rounded-full object-cover shadow-sm bg-slate-100" alt="User" />
                     <div className="leading-[1.1]">
                       <p className="text-[12px] text-[#2f6bff] opacity-90 mb-0.5">Chào Bạn, Mừng<br/>Bạn Quay Lại</p>
                       <h3 className="text-[14px] font-bold text-slate-900">{user.fullName}</h3>
                     </div>
                   </div>
                   <div className="flex gap-2">
                     <button onClick={() => setView('notifications')} className="w-9 h-9 rounded-full bg-[#EEF2FF] flex items-center justify-center text-[#2f6bff] shadow-sm relative">
                       <Bell size={18} strokeWidth={2} />
                       <span className="absolute top-[8px] right-[8px] w-[6px] h-[6px] bg-[#2f6bff] rounded-full border border-white"></span>
                     </button>
                     <button onClick={() => setView('settings')} className="w-9 h-9 rounded-full bg-[#EEF2FF] flex items-center justify-center text-[#2f6bff] shadow-sm">
                       <Settings size={18} strokeWidth={2} />
                     </button>
                   </div>
                 </div>
                 
                 <div className="flex items-center gap-4">
                   <div className="flex items-center gap-5 translate-y-1">
                     <button className="flex flex-col items-center gap-1.5" onClick={() => setView('doctorList')}>
                       <div className="text-[#2f6bff]"><Stethoscope size={24} strokeWidth={1.5} /></div>
                       <span className="text-[11px] font-medium text-[#2f6bff]">Bác Sĩ</span>
                     </button>
                     <button className="flex flex-col items-center gap-1.5" onClick={() => {setSortType('Heart'); setView('doctorList');}}>
                       <div className="text-[#2f6bff]"><Heart size={24} strokeWidth={1.5} /></div>
                       <span className="text-[11px] font-medium text-[#2f6bff]">Yêu Thích</span>
                     </button>
                   </div>
                   <div className="flex-1 relative h-10 ml-2">
                     <div className="absolute inset-0 bg-[#DEE8FF] rounded-full"></div>
                     <div className="absolute left-1 top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#2f6bff] shadow-sm"><SlidersHorizontal size={14} strokeWidth={2.5} /></div>
                     <input type="text" className="absolute inset-0 w-full h-full bg-transparent pl-11 pr-10 outline-none text-sm text-slate-800" />
                     <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-[#2f6bff]" size={18} strokeWidth={1.5} />
                   </div>
                 </div>
               </div>

               {/* LỊCH CHỌN NGÀY VÀ LỊCH HẸN ĐỘNG Ở HOME */}
               <div className="bg-[#D8E2FF] px-5 pt-6 pb-[28px] shrink-0 relative z-0">
                 <div className="flex justify-between gap-1.5 mb-5">
                   {homeDatesList.map((item, i) => {
                     const isActive = homeDate === item.d;
                     return (
                       <div key={i} onClick={() => setHomeDate(item.d)} className={`flex flex-col items-center justify-center flex-1 h-[72px] rounded-full cursor-pointer transition-all duration-300 ${isActive ? 'bg-[#407BFF] text-white shadow-md shadow-blue-500/20 scale-105' : 'bg-white text-slate-800 hover:bg-blue-50'}`}>
                         <span className={`text-[20px] font-bold leading-none ${isActive ? '' : 'text-slate-800'}`}>{item.d}</span>
                         <span className={`text-[9px] mt-1 font-bold ${isActive ? 'text-blue-100' : 'text-slate-500'}`}>{item.m}</span>
                       </div>
                     );
                   })}
                 </div>
                 
                 <div className="bg-white rounded-[24px] p-5 pb-7 shadow-sm">
                   <div className="text-right text-[#2f6bff] text-[10px] font-semibold mb-6 pr-4 mt-[-4px]">
                     {homeDate} {homeDatesList.find(d => d.d === homeDate)?.m || ''} - Được Chọn
                   </div>
                   <div className="space-y-[22px] relative ml-1">
                     {['9 AM', '10 AM', '11 AM', '12 AM'].map((time, i) => (
                       <div key={i} className="flex items-center justify-between gap-3 min-w-full">
                         <span className="w-[38px] text-[10px] font-bold text-[#2f6bff] text-right">{time}</span>
                         <div className="flex-1 border-b-[1.5px] border-dashed border-[#8EB0FF] opacity-[0.8] relative top-[1px]"></div>
                       </div>
                     ))}
                     
                     {/* Event Overlay */}
                     {homeDate === 11 ? (
                       <div className="absolute left-[58px] top-[26px] right-[8px] bg-[#B1CAFF] rounded-[16px] px-3.5 py-3 border-[3px] border-white text-slate-700 shadow-sm flex flex-col justify-center min-h-[64px]">
                         <h4 className="font-bold text-[12px] text-[#2f6bff] leading-tight mb-1 flex items-center gap-1 whitespace-nowrap overflow-hidden text-ellipsis">
                           ThS. BS. Nguyễn Mai Anh <CheckCircle2 size={12} className="text-[#2f6bff] shrink-0" strokeWidth={3} />
                         </h4>
                         <p className="text-[9.5px] leading-[1.3] text-[#4A5568] pr-4 font-medium opacity-80">Điều trị và theo dõi<br/>bệnh lý da liễu.</p>
                       </div>
                     ) : (
                       <div className="absolute left-[58px] top-[26px] right-[8px] bg-slate-50 rounded-[16px] px-3.5 py-3 border-[3px] border-white text-slate-400 shadow-sm flex flex-col items-center justify-center min-h-[64px]">
                         <span className="text-[11px] font-bold">Không có lịch hẹn</span>
                       </div>
                     )}
                   </div>
                 </div>
               </div>

               {/* Doctor List */}
               <div className="flex-1 bg-white px-5 py-6 space-y-4 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-24">
                 {doctors.map(doc => (
                   <div key={doc.id} onClick={() => { setSelectedDoctor(doc); setView('doctorDetail'); }} className="bg-[#DFE8FF] rounded-[32px] p-2.5 flex items-stretch gap-3 relative pb-[12px] cursor-pointer hover:bg-[#D5E1FF] transition-colors">
                     <img src={doc.img} alt={doc.name} className="w-[72px] h-[72px] rounded-[28px] bg-white border-[2.5px] border-white shrink-0 object-cover" />
                     <div className="flex-1 flex flex-col pt-[2px]">
                       <div className="bg-white rounded-2xl py-[5px] px-3.5 inline-flex flex-col mr-[56px]">
                         <h5 className="font-bold text-[#2f6bff] text-[13px] leading-tight mb-[1px] truncate">{doc.name}</h5>
                         <p className="text-slate-800 text-[10px] font-medium">{doc.specialty}</p>
                       </div>
                       <div className="flex gap-2 items-center mt-[8px]">
                         <div className="bg-white text-[#2f6bff] px-2 py-[2px] rounded-full text-[10px] font-bold flex items-center gap-1 shadow-sm"><Star size={9} className="fill-[#2f6bff]" /> {doc.rate}</div>
                         <div className="bg-white text-[#2f6bff] px-2 py-[2px] rounded-full text-[10px] font-bold flex items-center gap-1 shadow-sm"><MessageCircle size={10} className="text-[#2f6bff]" /> {doc.reviews}</div>
                       </div>
                     </div>
                     <div className="absolute right-3.5 bottom-3.5 flex gap-[6px]">
                       <button className="w-[26px] h-[26px] bg-white rounded-full flex items-center justify-center text-[#2f6bff] font-bold text-[13px] shadow-sm leading-none pb-[1px]?">?</button>
                       <button onClick={(e) => handleToggleFavorite(e, doc.id)} className="w-[26px] h-[26px] bg-white rounded-full flex items-center justify-center text-[#2f6bff] shadow-sm hover:scale-110 transition-transform">
                         <Heart size={12} strokeWidth={2.5} className={favoriteDoctors.includes(doc.id) ? "fill-[#2f6bff] text-[#2f6bff]" : "text-[#2f6bff]"} />
                       </button>
                     </div>
                   </div>
                 ))}
               </div>
               {/* HIDE BOTTOM NAV ONLY ON SUCCESS SCREEN, OR PASS IT */}
               <BottomNavigation view={view} setView={setView} selectedDoctor={selectedDoctor} />
             </motion.div>
          )}

          {/* 6. DOCTOR LIST */}
          {view === 'doctorList' && (
             <motion.div key="doctorList" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex flex-col bg-white overflow-hidden scrollbar-hide">
               <div className="bg-white px-5 pt-12 pb-4 shrink-0 z-20">
                 <div className="flex justify-between items-center mb-5">
                   <button onClick={() => setView('home')} className="w-9 h-9 flex items-center justify-center text-[#2f6bff]"><ChevronLeft size={28} strokeWidth={2.5} /></button>
                   <h2 className="text-[22px] font-extrabold text-[#2f6bff]">
                     {sortType === 'A-Z' && "Bác Sĩ"} {sortType === 'Star' && "Đánh Giá"} {sortType === 'Heart' && "Yêu Thích"} {sortType === 'Female' && "Nữ"} {sortType === 'Male' && "Nam"}
                   </h2>
                   <div className="flex gap-2">
                     <button className="w-8 h-8 rounded-full bg-[#EEF2FF] flex items-center justify-center text-[#2f6bff]"><Search size={16} strokeWidth={2.5} /></button>
                     <button className="w-8 h-8 rounded-full bg-[#EEF2FF] flex items-center justify-center text-[#2f6bff]"><SlidersHorizontal size={16} strokeWidth={2.5} /></button>
                   </div>
                 </div>
                 
                 <div className="flex items-center gap-3">
                   <div className="text-[10px] font-bold text-slate-600 leading-[1.1] text-left">Sắp Xếp<br/>Theo</div>
                   <div className="flex-1 flex gap-2 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                     <button onClick={() => setSortType('A-Z')} className={`px-4 py-1.5 rounded-full text-[11px] font-bold shadow-sm whitespace-nowrap shrink-0 transition-colors ${sortType === 'A-Z' ? 'bg-[#2f6bff] text-white shadow-[#2f6bff]/20' : 'bg-[#EEF2FF] text-[#2f6bff] opacity-80'}`}>A → Z</button>
                     <button onClick={() => setSortType('Star')} className={`w-[28px] h-[28px] rounded-full flex items-center justify-center shrink-0 border drop-shadow-sm transition-colors ${sortType === 'Star' ? 'bg-[#2f6bff] text-white border-[#2f6bff]' : 'bg-[#EEF2FF] text-[#2f6bff] border-[#b1caff]/60 opacity-80'}`}><Star size={14} strokeWidth={2.5} /></button>
                     <button onClick={() => setSortType('Heart')} className={`w-[28px] h-[28px] rounded-full flex items-center justify-center shrink-0 border drop-shadow-sm transition-colors ${sortType === 'Heart' ? 'bg-[#2f6bff] text-white border-[#2f6bff]' : 'bg-[#EEF2FF] text-[#2f6bff] border-[#b1caff]/60 opacity-80'}`}><Heart size={14} strokeWidth={2.5} /></button>
                     <button onClick={() => setSortType('Female')} className={`w-[28px] h-[28px] rounded-full flex items-center justify-center shrink-0 border drop-shadow-sm transition-colors ${sortType === 'Female' ? 'bg-[#2f6bff] text-white border-[#2f6bff]' : 'bg-[#EEF2FF] text-[#2f6bff] border-[#b1caff]/60 opacity-80'}`}><span className="text-[14px] font-bold tracking-tight">♀</span></button>
                     <button onClick={() => setSortType('Male')} className={`w-[28px] h-[28px] rounded-full flex items-center justify-center shrink-0 border drop-shadow-sm transition-colors ${sortType === 'Male' ? 'bg-[#2f6bff] text-white border-[#2f6bff]' : 'bg-[#EEF2FF] text-[#2f6bff] border-[#b1caff]/60 opacity-80'}`}><span className="text-[14px] font-bold tracking-tight">♂</span></button>
                   </div>
                 </div>
               </div>
               
               <div className="flex-1 overflow-y-auto px-5 py-2 space-y-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-24 relative z-10 w-full">
                 {sortType === 'Heart' && (
                   <div className="flex gap-4 mb-4 mt-2">
                     <button onClick={() => setFavoriteTab('doctors')} className={`flex-1 py-2.5 rounded-full font-bold text-[14px] shadow-sm transition-all ${favoriteTab === 'doctors' ? 'bg-[#2f6bff] text-white shadow-[#2f6bff]/30' : 'bg-[#DFE8FF] text-[#2f6bff]'}`}>Bác Sĩ</button>
                     <button onClick={() => setFavoriteTab('services')} className={`flex-1 py-2.5 rounded-full font-bold text-[14px] shadow-sm transition-all ${favoriteTab === 'services' ? 'bg-[#2f6bff] text-white shadow-[#2f6bff]/30' : 'bg-[#DFE8FF] text-[#2f6bff]'}`}>Dịch Vụ Y Tế</button>
                   </div>
                 )}

                 {(() => {
                   if (sortType === 'Heart' && favoriteTab === 'services') {
                     const servicesList = ['Nội tiết Da liễu', 'Công nghệ sinh học Thẩm mỹ', 'Di truyền Da liễu', 'Da liễu Ánh sáng', 'Khám tổng quát'];
                     return (
                       <div className="space-y-4 pb-8">
                         {servicesList.map(ser => (
                            <div key={ser} className="bg-[#DFE8FF] rounded-[24px] overflow-hidden shadow-sm border border-[#c5d6ff]/40">
                               <div onClick={() => setExpandedService(ser === expandedService ? '' : ser)} className="bg-[#2f6bff] text-white px-5 py-[14px] flex items-center justify-between font-bold text-[14px] cursor-pointer">
                                  <div className="flex items-center gap-2"><Heart size={16} fill="white" strokeWidth={0}/>{ser}</div>
                                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-[#2f6bff]"><ChevronDown size={16} strokeWidth={3} className={`transition-transform duration-300 ${expandedService === ser ? 'rotate-180' : ''}`} /></div>
                               </div>
                               {expandedService === ser && (
                                  <div className="p-5 bg-[#eaf0ff]">
                                     <p className="text-[#3b5998] text-[12px] leading-relaxed text-center font-medium mb-4">Chuyên khoa tập trung vào việc chẩn đoán và điều trị các vấn đề về da do rối loạn nội tiết tố gây ra. Chúng tôi kết hợp phác đồ y khoa và công nghệ chăm sóc da tiên tiến để mang lại kết quả bền vững.</p>
                                     <button className="w-full bg-[#DFE8FF] hover:bg-white transition-colors text-[#2f6bff] py-[10px] rounded-full font-bold text-[14px] shadow-sm border border-[#c5d6ff]">Đang tìm bác sĩ...</button>
                                  </div>
                               )}
                            </div>
                         ))}
                       </div>
                     );
                   }

                   let sortedDoctors = [...doctors];
                   if (sortType === 'A-Z') sortedDoctors.sort((a, b) => a.name.localeCompare(b.name));
                   else if (sortType === 'Star') sortedDoctors.sort((a, b) => b.rate - a.rate);
                   else if (sortType === 'Heart') {
                      sortedDoctors = sortedDoctors.filter(d => favoriteDoctors.includes(d.id));
                      if (sortedDoctors.length === 0) return <p className="text-center text-slate-500 mt-10 text-sm">Bạn chưa yêu thích bác sĩ nào.</p>
                   }
                   else if (sortType === 'Female') sortedDoctors = sortedDoctors.filter(d => d.gender === 'female');
                   else if (sortType === 'Male') sortedDoctors = sortedDoctors.filter(d => d.gender === 'male');
                   
                   return sortedDoctors.map(doc => {
                     if (sortType === 'Heart') {
                       return (
                         <div key={doc.id} onClick={() => { setSelectedDoctor(doc); setView('doctorDetail'); }} className="bg-[#DFE8FF] rounded-[24px] p-4 flex flex-col gap-3 relative shadow-sm border border-white cursor-pointer hover:bg-[#D5E1FF]">
                           <div className="flex gap-4">
                             <div className="w-[84px] h-[84px] bg-[#EEF2FF] rounded-full overflow-hidden border-2 border-white shadow-sm shrink-0 flex items-center justify-center mt-1"><img src={doc.img} alt={doc.name} className="w-full h-full object-cover" /></div>
                             <div className="flex-1 flex flex-col justify-center">
                               <div className="flex justify-between items-start mb-1">
                                  <div className="text-[#2f6bff] text-[10px] font-bold flex items-center gap-1 bg-white/50 px-2 pl-1 py-1 rounded-full w-max"><span className="text-[10px] bg-[#2f6bff] text-white w-4 h-4 rounded-full flex items-center justify-center">⚕</span><span className="pr-1 text-[9px]">Professional Doctor</span></div>
                                  <Heart onClick={(e) => handleToggleFavorite(e, doc.id)} fill="#2f6bff" strokeWidth={0} size={22} className="text-[#2f6bff] mt-1 cursor-pointer hover:scale-110 transition-transform" />
                               </div>
                               <h5 className="font-extrabold text-[#2f6bff] text-[15px] leading-tight mb-1">{doc.name}</h5>
                               <div className="text-[#4e74d9] text-[11px] font-semibold">{doc.specialty}</div>
                             </div>
                           </div>
                           <button onClick={(e) => { e.stopPropagation(); setSelectedDoctor(doc); setView('booking'); }} className="w-full bg-[#2f6bff] text-white py-2.5 rounded-full text-[13px] font-bold mt-1 shadow-sm shadow-[#2f6bff]/20">Đặt lịch khám</button>
                         </div>
                       );
                     } else {
                       return (
                         <div key={doc.id} onClick={() => { setSelectedDoctor(doc); setView('doctorDetail'); }} className="bg-[#DFE8FF] rounded-[24px] p-3.5 flex gap-4 relative shadow-sm border border-[#c5d6ff]/40 drop-shadow-sm cursor-pointer hover:bg-[#D5E1FF]">
                           <div className="relative shrink-0 flex items-center"><div className="w-[88px] h-[88px] bg-[#EEF2FF] rounded-full overflow-hidden border-4 border-white shadow-sm flex items-center justify-center"><img src={doc.img} alt={doc.name} className="w-full h-full object-cover mix-blend-multiply" /></div></div>
                           <div className="flex-1 flex flex-col justify-center">
                             <div className="flex justify-between items-start mb-1 gap-1">
                               <div className="text-[#2f6bff] text-[9px] font-extrabold flex items-center bg-white/60 px-2 py-0.5 rounded-full shadow-sm max-w-[120px] truncate"><span className="mr-1 text-[10px]">⚕️</span> Professional Doctor</div>
                               <div className="text-[#2f6bff] text-[10px] font-extrabold flex items-center bg-white px-1.5 py-0.5 rounded-full shadow-sm gap-0.5 shrink-0"><Star fill="#2f6bff" strokeWidth={0} size={10} /> {doc.rate}</div>
                             </div>
                             <h5 className="font-extrabold text-[#2f6bff] leading-tight text-[15px] mb-1">{doc.name}</h5>
                             <div className="text-[#5176d6] text-[11px] font-semibold mb-3">{doc.specialty}</div>
                             <div className="flex items-center gap-[6px] mt-auto">
                               <button onClick={(e) => { e.stopPropagation(); setSelectedDoctor(doc); setView('doctorDetail'); }} className="bg-[#2f6bff] hover:bg-blue-700 transition-colors text-white text-[11px] font-bold px-4 py-1.5 rounded-full shadow-sm shadow-[#2f6bff]/30">Info</button>
                               <button onClick={(e) => { e.stopPropagation(); setSelectedDoctor(doc); setView('booking'); }} className="w-[28px] h-[28px] bg-white rounded-full flex items-center justify-center text-[#2f6bff] shadow-sm"><Calendar size={13} strokeWidth={2.5}/></button>
                               <button onClick={(e) => { e.stopPropagation(); setSelectedDoctor(doc); setView('chat'); }} className="w-[28px] h-[28px] bg-white rounded-full flex items-center justify-center text-[#2f6bff] shadow-sm font-extrabold text-[13px]"><MessageCircle size={13} strokeWidth={2.5} /></button>
                               <button onClick={(e) => handleToggleFavorite(e, doc.id)} className="w-[28px] h-[28px] bg-white rounded-full flex items-center justify-center text-[#2f6bff] shadow-sm hover:scale-110 transition-transform">
                                 <Heart size={13} strokeWidth={2.5} className={favoriteDoctors.includes(doc.id) ? "fill-[#2f6bff] text-[#2f6bff]" : "text-[#2f6bff]"} />
                               </button>
                             </div>
                           </div>
                         </div>
                       );
                     }
                   });
                 })()}
               </div>
               <BottomNavigation view={view} setView={setView} selectedDoctor={selectedDoctor} />
             </motion.div>
          )}

          {/* 7. DOCTOR DETAIL */}
          {view === 'doctorDetail' && selectedDoctor && (
             <motion.div key="doctorDetail" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 flex flex-col bg-white overflow-hidden scrollbar-hide">
               <div className="px-5 pt-12 pb-4 shrink-0 bg-white z-20">
                 <div className="flex justify-between items-center mb-5">
                   <button onClick={() => setView('doctorList')} className="w-9 h-9 flex items-center justify-center text-[#2f6bff]"><ChevronLeft size={28} strokeWidth={2.5} /></button>
                   <h2 className="text-[22px] font-extrabold text-[#2f6bff] text-center leading-[1.1]">Thông Tin<br/>Bác Sĩ</h2>
                   <div className="flex gap-2">
                     <button className="w-8 h-8 rounded-full bg-[#EEF2FF] flex items-center justify-center text-[#2f6bff]"><Search size={16} strokeWidth={2.5} /></button>
                     <button className="w-8 h-8 rounded-full bg-[#EEF2FF] flex items-center justify-center text-[#2f6bff]"><SlidersHorizontal size={16} strokeWidth={2.5} /></button>
                   </div>
                 </div>
               </div>
               
               <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-[100px] relative z-10">
                 <div className="bg-[#DFE8FF] rounded-[32px] pt-[22px] pb-[18px] px-[18px] shadow-sm border border-[#c5d6ff]/40">
                   <div className="flex gap-2.5 mb-4 items-stretch">
                     <img src={selectedDoctor.img} alt={selectedDoctor.name} className="w-[136px] h-[136px] rounded-full object-cover bg-white border-[3px] border-white shrink-0 drop-shadow-md" />
                     <div className="flex-1 flex flex-col justify-end min-w-0 pb-1">
                       <div className="bg-[#407BFF] text-white rounded-[18px] px-2.5 py-[5px] inline-flex items-center gap-[6px] mb-2 w-fit self-end drop-shadow-md mr-1">
                         <div className="w-[18px] h-[18px] rounded-full border border-white/80 flex items-center justify-center shrink-0"><Lightbulb size={11} className="text-white fill-white" strokeWidth={2.5} /></div>
                         <div className="text-[9px] font-bold leading-tight">15 năm<br/>kinh nghiệm</div>
                       </div>
                       <div className="bg-[#407BFF] text-white rounded-[22px] rounded-tr-[4px] p-3 shadow-md relative w-full h-[88px]">
                         <p className="text-[11px] font-medium leading-[1.3] text-center line-clamp-4"><span className="font-bold">Chuyên môn:</span><br/>{selectedDoctor.expertise}</p>
                       </div>
                     </div>
                   </div>

                   <div className="bg-white rounded-full py-2.5 px-4 text-center mb-[18px] shadow-sm ml-1 mr-1">
                     <h3 className="text-[#2f6bff] font-extrabold text-[15px] leading-tight tracking-tight mb-[1px]">{selectedDoctor.name}</h3>
                     <p className="text-slate-700 text-[11px] font-medium">{selectedDoctor.specialty}</p>
                   </div>
                   
                   <div className="flex flex-wrap justify-center gap-[6px] mb-4">
                     <div className="bg-white text-[#2f6bff] px-3 py-1.5 rounded-full text-[10px] font-bold flex items-center gap-[5px] shadow-sm"><Star size={11} strokeWidth={3} className="fill-[#2f6bff]" /> {selectedDoctor.rate}</div>
                     <div className="bg-white text-[#2f6bff] px-3 py-1.5 rounded-full text-[10px] font-bold flex items-center gap-[5px] shadow-sm"><MessageCircle size={10} strokeWidth={2.5} className="mt-[1px]" /> {selectedDoctor.reviews}</div>
                     <div className="bg-white text-[#8baeff] px-3 py-1.5 rounded-full text-[10px] font-semibold flex items-center gap-[5px] shadow-sm"><Clock size={10} strokeWidth={2.5} className="mt-[1px]" /> {selectedDoctor.schedule}</div>
                   </div>
                   
                   <div className="flex items-center gap-1.5">
                     <button onClick={() => setView('booking')} className="flex-[2.2] bg-[#2f6bff] hover:bg-blue-700 transition-colors text-white text-[12px] font-bold py-[9px] rounded-[14px] shadow-md shadow-blue-600/20 flex justify-center items-center gap-[6px]">
                       <Calendar size={13} strokeWidth={2.5} /> Đặt lịch
                     </button>
                     <div className="flex gap-[6px] justify-end flex-[1.7]">
                       <button onClick={() => setView('chat')} className="w-[30px] h-[30px] bg-white rounded-full flex items-center justify-center text-[#2f6bff] shadow-sm hover:scale-110 transition-transform"><MessageCircle size={13} strokeWidth={2.5}/></button>
                       <button className="w-[30px] h-[30px] bg-white rounded-full flex items-center justify-center text-[#2f6bff] shadow-sm font-extrabold text-[13px]">?</button>
                       <button onClick={(e) => handleToggleFavorite(e, selectedDoctor.id)} className="w-[30px] h-[30px] bg-white rounded-full flex items-center justify-center text-[#2f6bff] shadow-sm hover:scale-110 transition-transform">
                         <Heart size={13} strokeWidth={2.5} className={favoriteDoctors.includes(selectedDoctor.id) ? "fill-[#2f6bff] text-[#2f6bff]" : "text-[#2f6bff]"} />
                       </button>
                     </div>
                   </div>
                 </div>

                 <div className="space-y-[18px] px-1">
                   <div>
                     <h3 className="text-[#2f6bff] font-extrabold text-[13px] mb-[6px]">Giới thiệu chung</h3>
                     <p className="text-slate-600 text-[10px] leading-[1.65] font-semibold text-justify tracking-wide">{selectedDoctor.intro} Mang lại phác đồ điều trị an toàn và hiệu quả nhất cho từng bệnh nhân.</p>
                   </div>
                   <div>
                     <h3 className="text-[#2f6bff] font-extrabold text-[13px] mb-[6px]">Quá Trình Công Tác / Kinh Nghiệm Làm Việc</h3>
                     <p className="text-slate-600 text-[10px] leading-[1.65] font-semibold text-justify tracking-wide">
                       "{selectedDoctor.workHistory} Sau đó, bác sĩ tiếp tục tu nghiệp chuyên sâu về Di truyền học Da liễu tại Nhật Bản. Hiện tại, {selectedDoctor.name.split('. ').pop()} đang là bác sĩ điều trị chính tại hệ thống phòng khám."
                     </p>
                   </div>
                   <div>
                     <h3 className="text-[#2f6bff] font-extrabold text-[13px] mb-[6px]">Chuyên Môn Nổi Bật</h3>
                     <p className="text-slate-600 text-[10px] leading-[1.65] font-semibold text-justify tracking-wide">
                       "Chuyên chẩn đoán, tầm soát và điều trị các bệnh lý da liễu mãn tính, phức tạp và có yếu tố di truyền như: Viêm da cơ địa, vảy nến, bạch biến, rụng tóc di truyền và các rối loạn sắc tố da. Ứng dụng phác đồ cá nhân hóa cho từng tình trạng bệnh lý."
                     </p>
                   </div>
                 </div>
               </div>
               <BottomNavigation view={view} setView={setView} selectedDoctor={selectedDoctor} />
             </motion.div>
          )}

          {/* 8. BOOKING - CHỌN NGÀY THÁNG ĐỘNG */}
          {view === 'booking' && (
              <motion.div key="booking" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 flex flex-col bg-white overflow-hidden scrollbar-hide pb-[80px] relative">
               <div className="pt-[44px] pb-3 px-3 shrink-0 bg-white flex items-center justify-between border-b border-[#2f6bff]">
                 <button onClick={() => setView('doctorDetail')} className="w-8 h-8 flex items-center justify-center text-[#2f6bff]"><ChevronLeft size={28} strokeWidth={2.5} /></button>
                 <div className="bg-[#2f6bff] px-[14px] py-1.5 rounded-full text-white text-[12px] font-extrabold max-w-[150px] truncate shadow-sm">
                   ThS. BS. {selectedDoctor?.name ? selectedDoctor.name.replace('ThS. BS. ', '').split(' ').slice(0,-1).join(' ') : 'Bác sĩ'}
                 </div>
                 <div className="flex gap-[5px]">
                   <button className="w-[26px] h-[26px] bg-[#2f6bff] rounded-full flex items-center justify-center text-white shadow-sm"><Phone size={12} strokeWidth={2.5}/></button>
                   <button className="w-[26px] h-[26px] bg-[#2f6bff] rounded-full flex items-center justify-center text-white shadow-sm"><Video size={12} strokeWidth={2.5}/></button>
                   <button onClick={() => setView('chat')} className="w-[26px] h-[26px] bg-[#2f6bff] rounded-full flex items-center justify-center text-white shadow-sm"><MessageCircle size={12} strokeWidth={2.5}/></button>
                 </div>
               </div>
               
               <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                 <div className="bg-[#cddcff] border-b border-[#2f6bff] pb-4 pt-3">
                   <div className="px-5 mb-[14px]">
                     <h3 onClick={() => setSelectedMonth(prev => (prev + 1) % 12)} className="text-[#2f6bff] text-[13px] font-extrabold uppercase flex items-center gap-1 tracking-wider cursor-pointer w-max select-none">
                       {monthsLabel[selectedMonth]} <ChevronRight size={14} className="rotate-90" strokeWidth={3} />
                     </h3>
                   </div>
                   <div className="flex items-center">
                     <button className="w-8 flex justify-center text-[#8baeff]" onClick={() => scrollDateSlider(-1)}><ChevronLeft size={24} strokeWidth={2.5} /></button>
                     <div id="booking-date-slider" className="flex-1 flex gap-2.5 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth">
                       {monthDays.map((item) => (
                         <button key={item.d} onClick={() => setSelectedDate(item.d)} className={`min-w-[48px] h-[64px] rounded-full flex flex-col items-center justify-center transition-all shadow-sm shrink-0 ${selectedDate === item.d ? 'bg-[#2f6bff] text-white' : 'bg-white text-[#94a3b8]'}`}>
                           <span className={`text-[20px] font-bold leading-tight ${selectedDate === item.d ? 'text-white' : 'text-[#8baeff]'}`}>{item.d}</span>
                           <span className={`text-[9px] font-extrabold tracking-widest ${selectedDate === item.d ? 'text-white/80' : 'text-[#cbd5e1]'}`}>{item.day}</span>
                         </button>
                       ))}
                     </div>
                     <button className="w-8 flex justify-center text-[#8baeff]" onClick={() => scrollDateSlider(1)}><ChevronRight size={24} strokeWidth={2.5} /></button>
                   </div>
                 </div>

                 <div className="px-5 py-5 space-y-6">
                   <div>
                     <h3 className="font-extrabold text-[#2f6bff] text-[14px] mb-[14px]">Khung giờ trống</h3>
                     <div className="flex flex-wrap gap-2.5">
                       {['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 M', '12:30 M', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM'].map(t => (
                         <button key={t} onClick={() => setSelectedTime(t)} className={`px-[18px] py-[7px] rounded-full text-[11px] font-extrabold transition-all shadow-sm ${selectedTime === t ? 'bg-[#2f6bff] text-white' : 'bg-[#EEF2FF] text-[#6b85cc]'}`}>{t}</button>
                       ))}
                     </div>
                   </div>

                   <div className="w-full h-px bg-[#2f6bff]"></div>

                   <div>
                     <h3 className="font-extrabold text-[#2f6bff] text-[14px] mb-[14px]">Thông tin bệnh nhân</h3>
                     <div className="flex gap-2 mb-[18px]">
                       <button onClick={() => setPatientType('self')} className={`px-4 py-[7px] rounded-full text-[11px] font-extrabold transition-all shadow-sm ${patientType === 'self' ? 'bg-[#2f6bff] text-white' : 'bg-white text-[#2f6bff] border border-[#2f6bff]'}`}>Cho Bản Thân</button>
                       <button onClick={() => setPatientType('relative')} className={`px-4 py-[7px] rounded-full text-[11px] font-extrabold transition-all shadow-sm ${patientType === 'relative' ? 'bg-[#2f6bff] text-white' : 'bg-white text-[#2f6bff] border border-[#2f6bff]'}`}>Cho Người Thân</button>
                     </div>
                     <div className="space-y-[14px]">
                       <div><label className="text-[12px] font-bold text-slate-700 pl-4 mb-1 block">Họ và tên</label><input type="text" value={patientName} onChange={e => setPatientName(e.target.value)} className="w-full px-5 py-[12px] bg-[#EEF2FF] text-[#2f6bff] rounded-full outline-none font-bold text-[13px]" /></div>
                       <div><label className="text-[12px] font-bold text-slate-700 pl-4 mb-1 block">Tuổi</label><input type="number" value={patientAge} onChange={e => setPatientAge(e.target.value)} className="w-full px-5 py-[12px] bg-[#EEF2FF] text-[#2f6bff] rounded-full outline-none font-bold text-[13px]" /></div>
                       <div>
                         <label className="text-[12px] font-bold text-slate-700 pl-4 mb-1 block">Gender</label>
                         <div className="flex gap-3 px-2">
                           {['Nam', 'Nữ', 'Khác'].map(g => (
                             <button key={g} onClick={() => setGender(g)} className={`px-7 py-[7px] rounded-full text-[12px] font-extrabold transition-all shadow-sm ${gender === g ? 'bg-[#2f6bff] text-white border border-[#2f6bff]' : 'bg-white text-[#2f6bff] border border-[#d5e0ff]'}`}>{g}</button>
                           ))}
                         </div>
                       </div>
                       <div className="w-full h-px bg-[#2f6bff] my-5"></div>
                       <div><label className="text-[12px] font-bold text-slate-700 pl-4 mb-2 block">Mô tả triệu chứng</label><textarea rows={4} value={symptoms} onChange={e => setSymptoms(e.target.value)} className="w-full px-5 py-4 bg-white border border-[#d5e0ff] rounded-[24px] outline-none font-bold text-[11px] text-slate-600 resize-none shadow-sm"></textarea></div>
                       <div className="pt-[14px] pb-[20px]"><button onClick={() => setView('paymentMethod')} className="w-full py-[15px] bg-[#2f6bff] text-white rounded-full font-extrabold text-[16px] shadow-lg shadow-[#2f6bff]/30">Tiếp tục</button></div>
                     </div>
                   </div>
                 </div>
               </div>
               <BottomNavigation view={view} setView={setView} selectedDoctor={selectedDoctor} />
             </motion.div>
          )}

          {/* 9. PAYMENT METHOD (PHƯƠNG THỨC THANH TOÁN) */}
          {view === 'paymentMethod' && (
             <motion.div key="paymentMethod" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 flex flex-col bg-[#F8FAFC] overflow-hidden pb-[80px] relative">
               <div className="pt-[44px] pb-5 px-5 shrink-0 bg-white flex items-center justify-between border-b border-slate-100 shadow-sm">
                 <button onClick={() => setView('booking')} className="w-8 h-8 flex items-center justify-center text-[#2f6bff]"><ChevronLeft size={28} strokeWidth={2.5} /></button>
                 <h2 className="text-[18px] font-extrabold text-[#2f6bff]">Phương Thức Thanh Toán</h2>
                 <div className="w-8"></div>
               </div>
               
               <div className="flex-1 overflow-y-auto px-5 py-6">
                 <h3 className="text-slate-800 font-extrabold text-[14px] mb-4 pl-1">Thẻ Tín Dụng & Thẻ Ghi Nợ</h3>
                 <div className="bg-white rounded-[24px] overflow-hidden shadow-sm border border-slate-100 mb-8">
                   <div onClick={() => setPaymentOption('credit')} className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-50 transition-colors">
                     <div className="flex items-center gap-3">
                       <CreditCard className="text-[#2f6bff]" size={24} strokeWidth={1.5} />
                       <span className="font-bold text-[14px] text-[#2f6bff]">Thêm Thẻ Mới</span>
                     </div>
                     <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center border-[#2f6bff]">
                        {paymentOption === 'credit' && <div className="w-2.5 h-2.5 bg-[#2f6bff] rounded-full"></div>}
                     </div>
                   </div>
                 </div>

                 <h3 className="text-slate-800 font-extrabold text-[14px] mb-4 pl-1">Tùy Chọn Thanh Toán Khác</h3>
                 <div className="bg-white rounded-[24px] overflow-hidden shadow-sm border border-slate-100 flex flex-col">
                   {[
                     { id: 'apple', label: 'Apple Pay', icon: <Smartphone className="text-slate-600" size={22} strokeWidth={1.5}/> },
                     { id: 'paypal', label: 'Paypal', icon: <span className="text-[#003087] font-black text-[18px] italic">P</span> },
                     { id: 'google', label: 'Google Pay', icon: <span className="text-slate-600 font-black text-[18px]">G</span> }
                   ].map((method, idx) => (
                     <div key={method.id} onClick={() => setPaymentOption(method.id)} className={`flex items-center justify-between p-4 cursor-pointer hover:bg-slate-50 transition-colors ${idx !== 2 ? 'border-b border-slate-100' : ''}`}>
                       <div className="flex items-center gap-3 w-10 justify-center">
                         {method.icon}
                       </div>
                       <span className="font-bold text-[14px] text-slate-700 flex-1">{method.label}</span>
                       <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center border-slate-300">
                          {paymentOption === method.id && <div className="w-2.5 h-2.5 bg-[#2f6bff] rounded-full"></div>}
                       </div>
                     </div>
                   ))}
                 </div>
               </div>

               <div className="p-5 bg-white z-50 mt-auto">
                 <button onClick={() => { if(paymentOption === 'credit') setView('addCard'); else setView('paymentSummary'); }} className="w-full py-[15px] bg-[#2f6bff] text-white rounded-full font-extrabold text-[16px] shadow-lg shadow-[#2f6bff]/30">
                   Tiếp Tục
                 </button>
               </div>
             </motion.div>
          )}

          {/* 10. ADD CARD */}
          {view === 'addCard' && (
             <motion.div key="addCard" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 flex flex-col bg-white overflow-hidden scrollbar-hide pb-0 relative">
               <div className="pt-[44px] pb-5 px-5 shrink-0 flex items-center justify-between">
                 <button onClick={() => setView('paymentMethod')} className="w-8 h-8 flex items-center justify-center text-[#2f6bff]"><ChevronLeft size={28} strokeWidth={2.5} /></button>
                 <h2 className="text-[20px] font-extrabold text-[#2f6bff]">Add Card</h2>
                 <div className="w-8"></div>
               </div>
               
               <div className="flex-1 overflow-y-auto px-5">
                 {/* Visual Card */}
                 <div className="w-full h-[200px] bg-gradient-to-tr from-blue-700 to-[#407BFF] rounded-[24px] shadow-xl shadow-blue-600/30 p-6 flex flex-col justify-between mb-8 relative overflow-hidden">
                   <div className="absolute top-[-20%] right-[-10%] w-[150px] h-[150px] bg-white/10 rounded-full blur-2xl"></div>
                   <div className="flex justify-between items-start">
                     <div className="w-12 h-8 bg-white/20 rounded-md"></div>
                     <div className="text-white/80 font-bold italic tracking-widest">VISA</div>
                   </div>
                   <div>
                     <div className="text-white font-mono text-[22px] tracking-[0.15em] mb-4 drop-shadow-sm">{cardNumber || '0000 0000 0000 0000'}</div>
                     <div className="flex justify-between">
                       <div>
                         <p className="text-white/60 text-[8px] uppercase tracking-wider mb-1">Card Holder Name</p>
                         <p className="text-white font-bold text-[13px] uppercase">{cardName || 'JOHN DOE'}</p>
                       </div>
                       <div>
                         <p className="text-white/60 text-[8px] uppercase tracking-wider mb-1">Expiry Date</p>
                         <p className="text-white font-bold text-[13px] uppercase">{cardExpiry || 'MM/YY'}</p>
                       </div>
                       <div className="flex items-end mb-1">
                         <div className="w-8 h-6 bg-white/30 rounded flex items-center justify-center"><CreditCard size={14} className="text-white"/></div>
                       </div>
                     </div>
                   </div>
                 </div>

                 {/* Inputs */}
                 <div className="space-y-4">
                   <div>
                     <label className="text-[13px] font-extrabold text-slate-800 ml-2 mb-2 block">Tên In Trên Thẻ</label>
                     <input type="text" value={cardName} onChange={e=>setCardName(e.target.value)} className="w-full bg-[#EEF2FF] border-none rounded-[16px] px-5 py-[14px] text-[13px] font-bold text-[#2f6bff] outline-none focus:ring-2 focus:ring-[#2f6bff]/20" />
                   </div>
                   <div>
                     <label className="text-[13px] font-extrabold text-slate-800 ml-2 mb-2 block">Số Thẻ</label>
                     <input type="text" value={cardNumber} onChange={e=>setCardNumber(e.target.value)} placeholder="0000 0000 0000 0000" className="w-full bg-[#EEF2FF] border-none rounded-[16px] px-5 py-[14px] text-[13px] font-bold text-[#2f6bff] outline-none focus:ring-2 focus:ring-[#2f6bff]/20" />
                   </div>
                   <div className="flex gap-4">
                     <div className="flex-1">
                       <label className="text-[13px] font-extrabold text-slate-800 ml-2 mb-2 block">Ngày Hết Hạn</label>
                       <input type="text" value={cardExpiry} onChange={e=>setCardExpiry(e.target.value)} placeholder="MM/YY" className="w-full bg-[#EEF2FF] border-none rounded-[16px] px-5 py-[14px] text-[13px] font-bold text-[#2f6bff] outline-none focus:ring-2 focus:ring-[#2f6bff]/20 text-center" />
                     </div>
                     <div className="flex-1">
                       <label className="text-[13px] font-extrabold text-slate-800 ml-2 mb-2 block">Mã Bảo Mật (CVV)</label>
                       <input type="password" value={cardCvv} onChange={e=>setCardCvv(e.target.value)} placeholder="000" className="w-full bg-[#EEF2FF] border-none rounded-[16px] px-5 py-[14px] text-[13px] font-bold text-[#2f6bff] outline-none focus:ring-2 focus:ring-[#2f6bff]/20 text-center tracking-widest" />
                     </div>
                   </div>
                 </div>
               </div>

               <div className="p-5 pb-8 bg-white z-50">
                 <button onClick={() => setView('paymentSummary')} className="w-full py-[15px] bg-[#2f6bff] text-white rounded-full font-extrabold text-[16px] shadow-lg shadow-[#2f6bff]/30">
                   Lưu Thông Tin Thẻ
                 </button>
               </div>
             </motion.div>
          )}

          {/* 11. PAYMENT SUMMARY (THANH TOÁN) */}
          {view === 'paymentSummary' && (
             <motion.div key="paymentSummary" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 flex flex-col bg-white overflow-hidden scrollbar-hide pb-0 relative">
               <div className="bg-[#2f6bff] h-[260px] pt-[44px] px-5 flex flex-col items-center text-white shrink-0 relative z-0">
                 <div className="w-full flex justify-between items-center mb-6">
                   <button onClick={() => setView('paymentMethod')} className="w-8 h-8 flex items-center justify-center text-white"><ChevronLeft size={28} strokeWidth={2.5} /></button>
                   <h2 className="text-[20px] font-extrabold text-white">Thanh Toán</h2>
                   <div className="w-8"></div>
                 </div>
                 <div className="text-[36px] font-black mt-2 tracking-tight">300.000 Đ</div>
               </div>

               <div className="flex-1 overflow-y-auto px-5 -mt-16 relative z-10 pb-20">
                 {/* Doctor Card Overlapping */}
                 <div className="bg-white rounded-[24px] p-4 flex gap-4 shadow-lg shadow-blue-900/10 border border-slate-100 mb-6">
                   <div className="w-[84px] h-[84px] bg-[#EEF2FF] rounded-full overflow-hidden shrink-0">
                     <img src={selectedDoctor?.img || ''} className="w-full h-full object-cover" alt="Doctor" />
                   </div>
                   <div className="flex-1 flex flex-col justify-center">
                     <h3 className="font-extrabold text-[#2f6bff] text-[15px] leading-tight mb-1 pr-4 relative">
                        {selectedDoctor?.name || 'ThS. BS. Nguyễn Mai Anh'}
                        <div className="absolute right-0 top-0 text-[#2f6bff]"><CheckCircle2 size={14} strokeWidth={3}/></div>
                     </h3>
                     <p className="text-slate-500 text-[11px] font-medium mb-3">{selectedDoctor?.specialty || 'Da liễu - Nội tiết'}</p>
                     <div className="flex gap-2">
                       <div className="bg-[#EEF2FF] text-[#2f6bff] px-[10px] py-[3px] rounded-full text-[10px] font-bold flex items-center gap-[4px]"><Star size={10} strokeWidth={3} className="fill-[#2f6bff]" /> 5</div>
                       <div className="bg-[#EEF2FF] text-[#2f6bff] px-[10px] py-[3px] rounded-full text-[10px] font-bold flex items-center gap-[4px]"><MessageCircle size={10} strokeWidth={2.5} className="mt-[1px]" /> 60</div>
                     </div>
                   </div>
                 </div>

                 {/* Details List */}
                 <div className="space-y-4 px-2">
                   <div className="flex justify-between items-center border-b border-dashed border-slate-200 pb-4">
                     <span className="text-[#8baeff] text-[12px] font-bold leading-tight">Ngày / Giờ<br/>khám</span>
                     <span className="text-slate-900 text-[12px] font-extrabold">{monthsLabel[selectedMonth]} {selectedDate}, 2026 / {selectedTime}</span>
                   </div>
                   <div className="flex justify-between items-center border-b border-dashed border-slate-200 pb-4">
                     <span className="text-[#8baeff] text-[12px] font-bold">Thời lượng dự kiến</span>
                     <span className="text-slate-900 text-[12px] font-extrabold">30 Phút</span>
                   </div>
                   <div className="flex justify-between items-center border-b border-dashed border-slate-200 pb-4">
                     <span className="text-[#8baeff] text-[12px] font-bold">Người khám</span>
                     <span className="text-slate-900 text-[12px] font-extrabold">{patientType === 'relative' ? 'Người Thân' : 'Bản Thân'}</span>
                   </div>
                 </div>

                 <div className="mt-6 bg-[#EEF2FF] rounded-[24px] p-5 space-y-4 border border-blue-100">
                   <div className="flex justify-between items-center">
                     <span className="text-slate-600 text-[12px] font-bold">Phí khám bệnh</span>
                     <span className="text-slate-900 text-[13px] font-black">300.000 Đ</span>
                   </div>
                   <div className="flex justify-between items-center border-b border-[#c5d6ff] pb-4">
                     <span className="text-slate-600 text-[12px] font-bold">Phụ phí</span>
                     <span className="text-slate-900 text-[13px] font-black">0 Đ</span>
                   </div>
                   <div className="flex justify-between items-center pt-1">
                     <span className="text-[#2f6bff] text-[14px] font-black uppercase">Tổng thanh toán</span>
                     <span className="text-[#2f6bff] text-[18px] font-black">300.000 Đ</span>
                   </div>
                 </div>

                 <div className="flex justify-between items-center mt-6 px-2">
                    <span className="text-[#8baeff] text-[12px] font-bold leading-tight">Phương thức<br/>thanh toán</span>
                    <div className="text-right">
                       <span className="text-slate-900 text-[13px] font-black block">Thẻ Visa/Mastercard</span>
                       <span onClick={() => setView('paymentMethod')} className="text-[#2f6bff] text-[10px] font-bold cursor-pointer hover:underline">Thay đổi</span>
                    </div>
                 </div>
               </div>

               <div className="p-5 pb-8 bg-white z-50 mt-auto border-t border-slate-100">
                 <button onClick={() => setView('paymentSuccess')} className="w-full py-[15px] bg-[#2f6bff] text-white rounded-full font-extrabold text-[16px] shadow-lg shadow-[#2f6bff]/30">
                   Thanh Toán Ngay
                 </button>
               </div>
             </motion.div>
          )}

          {/* 12. PAYMENT SUCCESS (THÀNH CÔNG) */}
          {view === 'paymentSuccess' && (
             <motion.div key="paymentSuccess" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex-1 flex flex-col bg-[#2f6bff] overflow-hidden relative justify-center px-6">
                {/* Decorative circles */}
                <div className="absolute top-10 left-[-20%] w-[200px] h-[200px] bg-white/5 rounded-full blur-2xl"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[300px] h-[300px] bg-[#1a4bcf]/50 rounded-full blur-3xl"></div>
                
                <div className="flex flex-col items-center z-10 w-full">
                   <div className="w-[120px] h-[120px] bg-white rounded-full flex items-center justify-center shadow-2xl shadow-blue-900/50 mb-8 border-8 border-white/20">
                     <Check size={64} strokeWidth={4} className="text-[#2f6bff]" />
                   </div>
                   
                   <h2 className="text-white text-[32px] font-black mb-2 tracking-tight">Thành Công!</h2>
                   <p className="text-blue-100 text-[15px] font-medium mb-12">Thanh toán hoàn tất</p>

                   <div className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-[32px] p-6 text-center shadow-xl">
                      <p className="text-blue-50 text-[12px] font-medium leading-[1.6] mb-6 px-2">
                         Bạn đã đặt lịch khám thành công với
                      </p>
                      <h3 className="text-white font-extrabold text-[18px] mb-6">{selectedDoctor?.name || 'Bác sĩ'}</h3>
                      
                      <div className="flex justify-center items-center gap-6 text-white bg-white/10 py-3 rounded-[20px] border border-white/10">
                         <div className="flex items-center gap-2">
                            <Calendar size={14} className="text-blue-200"/>
                            <span className="font-bold text-[12px]">{monthsLabel[selectedMonth]} {selectedDate}, 2026</span>
                         </div>
                         <div className="w-px h-6 bg-white/20"></div>
                         <div className="flex items-center gap-2">
                            <Clock size={14} className="text-blue-200"/>
                            <span className="font-bold text-[12px]">{selectedTime}</span>
                         </div>
                      </div>
                   </div>

                   <button onClick={() => { setView('myAppointments'); setAppointmentTab('Sắp Tới'); }} className="w-full py-[16px] bg-white text-[#2f6bff] hover:bg-blue-50 transition-colors rounded-full font-black text-[16px] shadow-xl mt-12">
                     Xem Lịch Hẹn Của Tôi
                   </button>
                   <button onClick={() => setView('home')} className="mt-6 text-blue-100 font-bold text-[13px] hover:text-white transition-colors">
                     Về Trang Chủ
                   </button>
                </div>
             </motion.div>
          )}

          {/* 13. MY APPOINTMENTS */}
          {view === 'myAppointments' && (
             <motion.div key="myAppointments" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} className="flex-1 flex flex-col bg-white overflow-hidden scrollbar-hide pb-[80px] relative">
               <div className="pt-[44px] pb-4 px-5 shrink-0 bg-white flex flex-col gap-4">
                 <div className="relative flex items-center justify-center">
                   <button onClick={() => setView('home')} className="absolute left-0 w-9 h-9 flex items-center justify-center text-[#2f6bff]"><ChevronLeft size={28} strokeWidth={2.5} /></button>
                   <h2 className="text-[20px] font-extrabold text-[#2f6bff] text-center leading-tight mx-10">Lịch Khám Của<br/>Tôi</h2>
                 </div>
                 <div className="flex gap-2 justify-center">
                   {['Đã Khám', 'Sắp Tới', 'Đã Hủy'].map((tab) => (
                     <button key={tab} onClick={() => setAppointmentTab(tab)} className={`flex-1 py-1.5 rounded-full text-[12px] font-bold transition-all shadow-sm ${appointmentTab === tab ? 'bg-[#2f6bff] text-white shadow-[#2f6bff]/20' : 'bg-[#DFE8FF] text-[#2f6bff] opacity-80'}`}>{tab}</button>
                   ))}
                 </div>
               </div>
               
               <div className="flex-1 overflow-y-auto px-5 py-2 space-y-5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                 {doctors.map((doc, i) => {
                   const upcomingDates = [{ day: 'Sunday, 12 June', time: '9:30 AM - 10:00 AM' }, { day: 'Friday, 20 June', time: '2:30 PM - 3:00 PM' }, { day: 'Tuesday, 15 June', time: '9:30 AM - 10:00 AM' }, { day: 'Wednesday, 25 June', time: '1:00 PM - 1:30 PM' }];
                   const upcoming = upcomingDates[i % upcomingDates.length];
                   return (
                     <div key={doc.id} className="bg-[#DFE8FF] rounded-[24px] p-[14px] shadow-sm border border-[#c5d6ff]/40">
                       <div className="flex gap-3 mb-[14px] items-center">
                         <img src={doc.img} alt={doc.name} className="w-[72px] h-[72px] rounded-full object-cover bg-white border-[2px] border-white shrink-0 drop-shadow-sm" />
                         <div className="flex-1 min-w-0">
                           <h3 className="text-[#2f6bff] font-extrabold text-[14px] leading-tight mb-0.5 pr-2 truncate">{doc.name}</h3>
                           <p className="text-slate-700 text-[11px] font-medium mb-1.5 truncate">{doc.specialty}</p>
                           {appointmentTab === 'Đã Khám' && (
                             <div className="flex gap-2">
                               <div className="bg-white text-[#2f6bff] px-[10px] py-[3px] rounded-full text-[10px] font-bold flex items-center gap-[4px] shadow-sm"><Star size={10} strokeWidth={3} className="fill-[#2f6bff]" /> {doc.rate}</div>
                               <div className="w-[22px] h-[22px] bg-white rounded-full flex items-center justify-center text-[#2f6bff] shadow-sm"><Heart size={10} strokeWidth={2.5}/></div>
                             </div>
                           )}
                         </div>
                       </div>
                       
                       {appointmentTab === 'Sắp Tới' && (
                         <div className="flex gap-2 mb-[14px]">
                            <div className="bg-white text-[#2f6bff] px-[10px] py-[4px] rounded-full text-[10px] font-bold flex items-center gap-[4px] shadow-sm"><Calendar size={11} strokeWidth={2.5} /> {upcoming.day}</div>
                            <div className="bg-white text-[#2f6bff] px-[10px] py-[4px] rounded-full text-[10px] font-bold flex items-center gap-[4px] shadow-sm"><Clock size={11} strokeWidth={2.5} /> {upcoming.time}</div>
                         </div>
                       )}
                       
                       <div className="flex gap-[10px]">
                         {appointmentTab === 'Đã Khám' && (
                           <>
                             <button onClick={() => { setSelectedDoctor(doc); setView('doctorDetail'); }} className="flex-1 bg-white text-[#2f6bff] text-[14px] font-extrabold py-2 rounded-full shadow-sm">Đặt Lại</button>
                             <button onClick={() => { setSelectedDoctor(doc); setView('reviewDoctor'); }} className="flex-1 bg-[#2f6bff] text-white text-[14px] font-extrabold py-2 rounded-full shadow-sm shadow-[#2f6bff]/20">Đánh Giá</button>
                           </>
                         )}
                         {appointmentTab === 'Sắp Tới' && (
                           <>
                             <button className="flex-1 bg-[#2f6bff] text-white text-[14px] font-extrabold py-2 rounded-full shadow-sm shadow-[#2f6bff]/20">Xem Chi Tiết</button>
                             <button className="w-[36px] h-[36px] bg-white rounded-full flex items-center justify-center text-[#2f6bff] shadow-sm shrink-0"><CheckCircle2 size={16} strokeWidth={3} /></button>
                             <button onClick={() => { setSelectedDoctor(doc); setView('cancelAppointment'); }} className="w-[36px] h-[36px] bg-white rounded-full flex items-center justify-center text-[#2f6bff] shadow-sm shrink-0"><span className="text-[17px] font-extrabold pb-[1px] leading-none text-center">×</span></button>
                           </>
                         )}
                         {appointmentTab === 'Đã Hủy' && (
                           <button onClick={() => { setSelectedDoctor(doc); setView('reviewDoctor'); }} className="flex-1 bg-[#2f6bff] text-white text-[14px] font-extrabold py-2 rounded-full shadow-sm shadow-[#2f6bff]/20">Đánh Giá</button>
                         )}
                       </div>
                     </div>
                   );
                 })}
                 <div className="h-8"></div>
               </div>
               <BottomNavigation view={view} setView={setView} selectedDoctor={selectedDoctor} />
             </motion.div>
          )}

          {/* 14. CANCEL APPOINTMENT */}
          {view === 'cancelAppointment' && (
             <motion.div key="cancelAppointment" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 flex flex-col bg-white overflow-hidden scrollbar-hide pb-[80px] relative">
               <div className="pt-[44px] pb-5 px-5 shrink-0 bg-white flex items-center justify-between">
                 <button onClick={() => setView('myAppointments')} className="w-8 h-8 flex items-center justify-center text-[#2f6bff]"><ChevronLeft size={28} strokeWidth={2.5} /></button>
                 <h2 className="text-[20px] font-extrabold text-[#2f6bff]">Hủy lịch khám</h2>
                 <div className="w-8"></div>
               </div>
               <div className="flex-1 overflow-y-auto px-6 py-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                 <p className="text-slate-700 text-[11px] leading-[1.6] font-medium text-justify mb-8">Vui lòng cho chúng tôi biết lý do bạn muốn hủy lịch khám này. Việc hủy lịch có thể ảnh hưởng đến thứ tự ưu tiên của bạn trong lần đặt tiếp theo</p>
                 <div className="space-y-3 mb-6">
                   {['Tôi Muốn Đổi Lịch Khám', 'Thời Tiết Xấu / Khó Di Chuyển', 'Có Việc Bận Đột Xuất', 'Lý Do Khác'].map(reason => (
                     <div key={reason} onClick={() => setCancelReason(reason)} className={`flex items-center gap-3 p-3 rounded-full transition-all cursor-pointer ${cancelReason === reason ? 'bg-[#cddcff]' : 'bg-transparent'}`}>
                       <div className="w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#2f6bff] shrink-0 bg-transparent">{cancelReason === reason && <div className="w-2.5 h-2.5 bg-[#2f6bff] rounded-full"></div>}</div>
                       <span className={`text-[13px] font-bold ${cancelReason === reason ? 'text-slate-800' : 'text-slate-700'}`}>{reason}</span>
                     </div>
                   ))}
                 </div>
                 {cancelReason === 'Lý Do Khác' && (
                   <>
                     <p className="text-[#8baeff] text-[10px] leading-[1.6] font-bold text-justify mb-4">Nếu bạn chọn Lý do khác, vui lòng mô tả chi tiết dưới đây để chúng tôi hỗ trợ tốt hơn.</p>
                     <textarea rows={6} value={otherCancelReason} onChange={e => setOtherCancelReason(e.target.value)} placeholder="Nhập Lý Do Của Bạn Vào Đây..." className="w-full px-5 py-4 bg-[#EEF2FF] border-none rounded-[24px] outline-none font-bold text-[12px] text-[#2f6bff] resize-none"></textarea>
                   </>
                 )}
               </div>
               <div className="p-5 bg-white z-50 mt-auto">
                 <button onClick={() => { alert('Lịch đã bị hủy!'); setView('myAppointments'); }} className="w-full py-[15px] bg-[#2f6bff] text-white rounded-full font-extrabold text-[16px]">Xác nhận hủy lịch</button>
               </div>
               <BottomNavigation view={view} setView={setView} selectedDoctor={selectedDoctor} />
             </motion.div>
          )}

          {/* 15. REVIEW DOCTOR */}
          {view === 'reviewDoctor' && (
             <motion.div key="reviewDoctor" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 flex flex-col bg-white overflow-hidden scrollbar-hide pb-[80px] relative">
               <div className="pt-[44px] pb-5 px-5 shrink-0 bg-white flex items-center justify-between">
                 <button onClick={() => setView('myAppointments')} className="w-8 h-8 flex items-center justify-center text-[#2f6bff]"><ChevronLeft size={28} strokeWidth={2.5} /></button>
                 <h2 className="text-[20px] font-extrabold text-[#2f6bff]">Đánh giá bác sĩ</h2>
                 <div className="w-8"></div>
               </div>
               <div className="flex-1 overflow-y-auto px-6 py-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                 <p className="text-slate-700 text-[11px] leading-[1.6] font-medium text-justify mb-8">Cảm ơn bạn đã sử dụng dịch vụ. Hãy để lại đánh giá về trải nghiệm khám bệnh của bạn để giúp chúng tôi không ngừng cải thiện chất lượng phục vụ.</p>
                 <div className="flex flex-col items-center mb-8">
                   <div className="w-[120px] h-[120px] rounded-full overflow-hidden mb-4 border-[3px] border-white drop-shadow-md"><img src={selectedDoctor?.img || ''} className="w-full h-full object-cover bg-slate-100" alt="Doctor" /></div>
                   <h3 className="font-extrabold text-[#2f6bff] text-[15px] leading-tight mb-1">{selectedDoctor?.name}</h3>
                   <p className="text-slate-600 text-[12px] font-medium mb-4">{selectedDoctor?.specialty}</p>
                   <div className="flex bg-[#DFE8FF] rounded-full overflow-hidden shadow-sm shadow-[#2f6bff]/10">
                     <div className="px-3 py-1.5 flex items-center justify-center border-r-[1.5px] border-white"><Heart size={14} strokeWidth={3} className="text-[#2f6bff]"/></div>
                     <div className="px-3 py-1.5 flex items-center justify-center gap-1.5">
                       {[1,2,3,4,5].map(star => <Star key={star} size={16} strokeWidth={0} onClick={() => setRating(star)} className={`cursor-pointer ${star <= rating ? 'fill-[#2f6bff]' : 'fill-[#cddcff]'}`} />)}
                     </div>
                   </div>
                 </div>
                 <textarea rows={6} value={reviewText} onChange={e => setReviewText(e.target.value)} placeholder="Viết Nhận Xét Của Bạn Về Bác Sĩ, Thái Độ Phục Vụ Hoặc Chất Lượng Điều Trị..." className="w-full px-5 py-4 bg-[#EEF2FF] border-none rounded-[20px] outline-none font-bold text-[12px] text-[#2f6bff] resize-none"></textarea>
               </div>
               <div className="p-5 bg-white z-50 mt-auto">
                 <button onClick={() => { alert('Cảm ơn bạn đã đánh giá!'); setView('myAppointments'); }} className="w-full py-[15px] bg-[#2f6bff] text-white rounded-full font-extrabold text-[16px]">Gửi Đánh Giá</button>
               </div>
               <BottomNavigation view={view} setView={setView} selectedDoctor={selectedDoctor} />
             </motion.div>
          )}

          {/* 16. CHAT GIAO DIỆN MỚI */}
          {view === 'chat' && (
            <motion.div key="chat" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 flex flex-col bg-white overflow-hidden scrollbar-hide pb-[140px] relative">
              <div className="bg-[#2f6bff] pt-[50px] pb-4 px-4 shrink-0 flex items-center justify-between z-20">
                <div className="flex items-center gap-3">
                  <button onClick={() => setView('doctorDetail')} className="text-white"><ChevronLeft size={28} strokeWidth={2.5} /></button>
                  <h2 className="text-white font-extrabold text-[16px]">{selectedDoctor?.name || 'Bác Sĩ'}</h2>
                </div>
                <div className="flex gap-2">
                  <button className="w-[32px] h-[32px] rounded-full bg-white/20 flex items-center justify-center text-white backdrop-blur-sm"><Phone size={16} strokeWidth={2.5} /></button>
                  <button className="w-[32px] h-[32px] rounded-full bg-white/20 flex items-center justify-center text-white backdrop-blur-sm"><Video size={16} strokeWidth={2.5} /></button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4 bg-white [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {chatMessages.map((msg, idx) => (
                  <div key={idx} className={`flex flex-col w-full ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                    {msg.audio ? (
                      <div className="flex items-center gap-2 max-w-[80%]">
                         <img src={selectedDoctor?.img || '/bs_mai_anh.png'} alt="Doctor" className="w-[36px] h-[36px] rounded-full object-cover border-[2px] border-white shadow-sm shrink-0" />
                         <div className="bg-[#F1F5F9] px-4 py-2.5 rounded-[20px] rounded-tl-sm shadow-sm flex items-center gap-3 flex-1 min-w-[180px]">
                            <button className="w-[28px] h-[28px] bg-[#2f6bff] rounded-full flex items-center justify-center text-white shrink-0 shadow-sm shadow-[#2f6bff]/30"><Play size={14} strokeWidth={3} className="ml-0.5" /></button>
                            <div className="flex-1 h-1 bg-[#cbd5e1] rounded-full relative">
                               <div className="absolute left-0 top-0 bottom-0 w-[40%] bg-[#2f6bff] rounded-full"></div>
                               <div className="absolute left-[40%] top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-[#2f6bff] rounded-full border-2 border-white shadow-sm"></div>
                            </div>
                            <span className="text-[#64748b] text-[10px] font-bold tracking-wide">{msg.duration}</span>
                         </div>
                      </div>
                    ) : (
                      <div className={`text-[12px] font-medium leading-[1.5] p-3.5 shadow-sm text-left ${msg.sender === 'user' ? 'bg-[#DFE8FF] text-slate-700 rounded-[20px] rounded-tr-sm max-w-[80%]' : 'bg-[#F1F5F9] text-slate-700 rounded-[20px] rounded-tl-sm max-w-[80%]'}`}>
                        {msg.text}
                      </div>
                    )}
                    <span className={`text-[10px] font-bold mt-1 ${msg.sender === 'user' ? 'text-[#8baeff] pr-1' : 'text-[#94A3B8] pl-[44px]'}`}>{msg.time}</span>
                  </div>
                ))}
                <div ref={chatEndRef} className="h-1" />
              </div>

              <div className="bg-[#DFE8FF] px-4 py-3 flex items-center gap-3 absolute bottom-[80px] w-full z-20">
                 <button className="text-[#8baeff] shrink-0"><Paperclip size={22} strokeWidth={2.5} /></button>
                 <div className="flex-1 bg-white rounded-full flex items-center px-4 py-[9px] gap-2 shadow-sm">
                   <input type="text" placeholder="Nhập tin nhắn..." value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSendChat()} className="flex-1 bg-transparent border-none outline-none text-[13px] font-semibold text-slate-700 placeholder-[#94A3B8]" />
                   <button className="text-[#8baeff] shrink-0"><Mic size={20} strokeWidth={2.5} /></button>
                 </div>
                 <button onClick={handleSendChat} className="w-[42px] h-[42px] bg-[#2f6bff] rounded-full flex items-center justify-center text-white shrink-0 shadow-md shadow-[#2f6bff]/30"><Send size={18} strokeWidth={2.5} className="mr-0.5 mt-0.5" /></button>
              </div>
              <BottomNavigation view={view} setView={setView} selectedDoctor={selectedDoctor} />
            </motion.div>
          )}

          {/* CÁC MÀN HÌNH SETTINGS/PROFILE CHUNG (Bên dưới) */}
          
          {/* PROFILE MAIN */}
          {view === 'myProfile' && (
             <motion.div key="myProfile" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 flex flex-col bg-white overflow-hidden pb-[80px] relative">
                <div className="pt-[44px] pb-3 px-5 border-none flex items-center justify-between relative">
                  <button onClick={() => setView('home')} className="w-8 h-8 flex items-center justify-center text-[#2f6bff]" style={{zIndex: 10}}><ChevronLeft size={28} strokeWidth={2.5} /></button>
                  <h2 className="text-[#2f6bff] font-extrabold text-[20px] leading-[1.2] text-center w-full absolute left-0 right-0 pointer-events-none -mr-4 flex flex-col pt-1"><span>Hồ Sơ Của</span><span>Tôi</span></h2>
                  <div className="w-8 h-8" />
                </div>
                <div className="flex flex-col items-center mt-6 mb-8 relative">
                   <div className="relative">
                      <img src="https://i.pravatar.cc/150?u=kiet&img=11" alt="User avatar" className="w-[100px] h-[100px] rounded-full object-cover border-[3px] border-[#2f6bff] shadow-md bg-zinc-200" />
                      <div className="absolute bottom-0 right-0 bg-[#2f6bff] w-7 h-7 rounded-full flex items-center justify-center border-2 border-white shadow-sm cursor-pointer hover:bg-blue-700 transition" onClick={() => setView('editProfile')}><Pencil size={12} strokeWidth={2.5} className="text-white" /></div>
                   </div>
                   <h3 className="mt-4 font-black text-[18px] text-slate-800 tracking-tight">Thế Kiệt</h3>
                </div>
                <div className="flex-1 overflow-y-auto px-6 space-y-5">
                   <button onClick={() => setView('editProfile')} className="w-full flex items-center justify-between group"><div className="flex items-center gap-4"><div className="w-10 h-10 rounded-full bg-[#EEF2FF] flex items-center justify-center text-[#2f6bff] group-hover:bg-[#2f6bff] group-hover:text-white transition-colors duration-300"><User size={20} strokeWidth={2.5} /></div><span className="font-extrabold text-[15px] text-slate-800">Hồ Sơ</span></div><ChevronRight size={18} strokeWidth={2.5} className="text-[#c5d6ff]" /></button>
                   <button onClick={() => {setSortType('Heart'); setView('doctorList')}} className="w-full flex items-center justify-between group"><div className="flex items-center gap-4"><div className="w-10 h-10 rounded-full bg-[#EEF2FF] flex items-center justify-center text-[#2f6bff] group-hover:bg-[#2f6bff] group-hover:text-white transition-colors duration-300"><Heart size={20} strokeWidth={2.5} /></div><span className="font-extrabold text-[15px] text-slate-800">Yêu Thích</span></div><ChevronRight size={18} strokeWidth={2.5} className="text-[#c5d6ff]" /></button>
                   <button className="w-full flex items-center justify-between group"><div className="flex items-center gap-4"><div className="w-10 h-10 rounded-full bg-[#EEF2FF] flex items-center justify-center text-[#2f6bff] group-hover:bg-[#2f6bff] group-hover:text-white transition-colors duration-300"><Wallet size={20} strokeWidth={2.5} /></div><span className="font-extrabold text-[15px] text-slate-800 text-left leading-tight">Phương Thức<br/>Thanh Toán</span></div><ChevronRight size={18} strokeWidth={2.5} className="text-[#c5d6ff]" /></button>
                   <button className="w-full flex items-center justify-between group"><div className="flex items-center gap-4"><div className="w-10 h-10 rounded-full bg-[#EEF2FF] flex items-center justify-center text-[#2f6bff] group-hover:bg-[#2f6bff] group-hover:text-white transition-colors duration-300"><Lock size={20} strokeWidth={2.5} /></div><span className="font-extrabold text-[15px] text-slate-800 text-left leading-tight">Chính Sách Bảo<br/>Mật</span></div><ChevronRight size={18} strokeWidth={2.5} className="text-[#c5d6ff]" /></button>
                   <button onClick={() => setView('settings')} className="w-full flex items-center justify-between group"><div className="flex items-center gap-4"><div className="w-10 h-10 rounded-full bg-[#EEF2FF] flex items-center justify-center text-[#2f6bff] group-hover:bg-[#2f6bff] group-hover:text-white transition-colors duration-300"><Settings size={20} strokeWidth={2.5} /></div><span className="font-extrabold text-[15px] text-slate-800">Cài Đặt</span></div><ChevronRight size={18} strokeWidth={2.5} className="text-[#c5d6ff]" /></button>
                   <button className="w-full flex items-center justify-between group"><div className="flex items-center gap-4"><div className="w-10 h-10 rounded-full bg-[#EEF2FF] flex items-center justify-center text-[#2f6bff] group-hover:bg-[#2f6bff] group-hover:text-white transition-colors duration-300"><HelpCircle size={20} strokeWidth={2.5} /></div><span className="font-extrabold text-[15px] text-slate-800">Giúp Đỡ</span></div><ChevronRight size={18} strokeWidth={2.5} className="text-[#c5d6ff]" /></button>
                   <button onClick={() => setShowLogoutModal(true)} className="w-full flex items-center justify-between group pt-2 pb-6"><div className="flex items-center gap-4"><div className="w-10 h-10 rounded-full bg-[#EEF2FF] flex items-center justify-center text-[#2f6bff] group-hover:bg-[#2f6bff] group-hover:text-white transition-colors duration-300"><LogOut size={20} strokeWidth={2.5} /></div><span className="font-extrabold text-[15px] text-slate-800">Đăng Xuất</span></div></button>
                </div>
                <BottomNavigation view={view} setView={setView} selectedDoctor={selectedDoctor} />
             </motion.div>
          )}

          {/* EDIT PROFILE */}
          {view === 'editProfile' && (
             <motion.div key="editProfile" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 flex flex-col bg-white overflow-hidden scrollbar-hide relative">
                <div className="pt-[44px] pb-3 px-5 border-none flex items-center justify-between relative">
                  <button onClick={() => setView('myProfile')} className="w-8 h-8 flex items-center justify-center text-[#2f6bff] z-10"><ChevronLeft size={28} strokeWidth={2.5} /></button>
                  <h2 className="text-[#2f6bff] font-extrabold text-[20px] absolute w-full text-center left-0 right-0 top-[48px]">Hồ Sơ</h2>
                  <button onClick={() => setView('settings')} className="w-8 h-8 flex items-center justify-center text-[#2f6bff] z-10"><Settings size={20} strokeWidth={2.5} /></button>
                </div>
                <div className="flex-1 overflow-y-auto px-6 space-y-5 pb-[40px] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                   <div className="flex flex-col items-center mt-6 mb-8 relative">
                      <div className="relative">
                         <img src="https://i.pravatar.cc/150?u=kiet&img=11" alt="User avatar" className="w-[100px] h-[100px] rounded-full object-cover border-[3px] border-[#2f6bff] shadow-md bg-zinc-200" />
                         <div className="absolute bottom-0 right-0 bg-[#2f6bff] w-7 h-7 rounded-full flex items-center justify-center border-2 border-white shadow-sm cursor-pointer hover:bg-blue-700 transition"><Pencil size={12} strokeWidth={2.5} className="text-white" /></div>
                      </div>
                   </div>
                   <div className="flex flex-col gap-2"><label className="text-[13px] font-extrabold text-slate-800">Họ Và Tên</label><input type="text" defaultValue="Thế Kiệt" className="w-full bg-[#EEF2FF] border-none rounded-[16px] px-5 py-[14px] text-[14px] font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-[#2f6bff]/20" /></div>
                   <div className="flex flex-col gap-2"><label className="text-[13px] font-extrabold text-slate-800">Số Điện Thoại</label><input type="tel" defaultValue="+123 567 89000" className="w-full bg-[#EEF2FF] border-none rounded-[16px] px-5 py-[14px] text-[14px] font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-[#2f6bff]/20" /></div>
                   <div className="flex flex-col gap-2"><label className="text-[13px] font-extrabold text-slate-800">Email</label><input type="email" defaultValue="@example.com" className="w-full bg-[#EEF2FF] border-none rounded-[16px] px-5 py-[14px] text-[14px] font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-[#2f6bff]/20" /></div>
                   <div className="flex flex-col gap-2"><label className="text-[13px] font-extrabold text-slate-800">Ngày Sinh</label><input type="text" defaultValue="DD / MM / YYYY" className="w-full bg-[#EEF2FF] border-none rounded-[16px] px-5 py-[14px] text-[14px] font-semibold text-[#2f6bff] outline-none focus:ring-2 focus:ring-[#2f6bff]/20 placeholder-[#6c9cff]" placeholder="DD / MM / YYYY" /></div>
                   <div className="pt-8 pb-4 flex justify-center"><button onClick={() => {alert('Cập nhật hồ sơ thành công!'); setView('myProfile');}} className="bg-[#2f6bff] hover:bg-blue-700 transition-colors text-white text-[15px] font-extrabold px-12 py-[14px] rounded-full shadow-lg shadow-[#2f6bff]/20">Cập Nhật Hồ Sơ</button></div>
                </div>
             </motion.div>
          )}

          {/* SETTINGS */}
          {view === 'settings' && (
             <motion.div key="settings" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 flex flex-col bg-white overflow-hidden pb-[80px] relative">
                <div className="pt-[44px] pb-6 px-5 border-none flex items-center justify-between relative">
                  <button onClick={() => setView('myProfile')} className="w-8 h-8 flex items-center justify-center text-[#2f6bff] z-10"><ChevronLeft size={28} strokeWidth={2.5} /></button>
                  <h2 className="text-[#2f6bff] font-extrabold text-[20px] absolute w-full text-center left-0 right-0 top-[48px]">Cài Đặt</h2>
                  <div className="w-8 h-8" />
                </div>
                <div className="flex-1 overflow-y-auto px-6 space-y-8 mt-4">
                   <button onClick={() => setView('notificationSettings')} className="w-full flex items-center justify-between group"><div className="flex items-center gap-4"><div className="text-[#2f6bff]"><Bell size={20} strokeWidth={2.2} /></div><span className="font-extrabold text-[15px] text-slate-800">Cài Đặt Thông Báo</span></div><ChevronRight size={18} strokeWidth={2.5} className="text-[#2f6bff]" /></button>
                   <button onClick={() => setView('passwordManager')} className="w-full flex items-center justify-between group"><div className="flex items-center gap-4"><div className="text-[#2f6bff]"><Key size={20} strokeWidth={2.2} /></div><span className="font-extrabold text-[15px] text-slate-800">Quản Lý Mật Khẩu</span></div><ChevronRight size={18} strokeWidth={2.5} className="text-[#2f6bff]" /></button>
                   <button className="w-full flex items-center justify-between group"><div className="flex items-center gap-4"><div className="text-[#2f6bff]"><UserX size={20} strokeWidth={2.2} /></div><span className="font-extrabold text-[15px] text-slate-800">Xóa Tài Khoản</span></div><ChevronRight size={18} strokeWidth={2.5} className="text-[#2f6bff]" /></button>
                </div>
             </motion.div>
          )}

          {/* NOTIFICATION SETTINGS */}
          {view === 'notificationSettings' && (
             <motion.div key="notificationSettings" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 flex flex-col bg-white overflow-hidden pb-[80px] relative">
                <div className="pt-[44px] pb-6 px-5 border-none flex items-center justify-between relative">
                  <button onClick={() => setView('settings')} className="w-8 h-8 flex items-center justify-center text-[#2f6bff] z-10"><ChevronLeft size={28} strokeWidth={2.5} /></button>
                  <h2 className="text-[#2f6bff] font-extrabold text-[20px] absolute w-full text-center left-0 right-0 top-[48px]">Cài Đặt Thông Báo</h2>
                  <div className="w-8 h-8" />
                </div>
                <div className="flex-1 overflow-y-auto px-6 space-y-6 mt-4">
                  {[{ key: 'chung', label: 'Thông Báo Chung' }, { key: 'amThanh', label: 'Âm Thanh' }, { key: 'amThanhCuocGoi', label: 'Âm Thanh\nCuộc Gọi' }, { key: 'rung', label: 'Rung' }, { key: 'uuDai', label: 'Ưu Đãi Đặc Biệt' }, { key: 'thanhToan', label: 'Thanh Toán' }, { key: 'khuyenMai', label: 'Khuyến Mãi Và Giảm\nGiá' }, { key: 'hoanTien', label: 'Hoàn Tiền' }].map(({ key, label }) => (
                    <div key={key} className="flex items-center justify-between w-full">
                       <span className="font-semibold text-[15px] text-slate-800 whitespace-pre-line leading-tight">{label}</span>
                       <button onClick={() => setNotifications(prev => ({ ...prev, [key]: !prev[key] }))} className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${notifications[key] ? 'bg-[#2f6bff]' : 'bg-[#e2e8f0]'}`}><div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-300 ${notifications[key] ? 'left-[26px]' : 'left-0.5'}`} /></button>
                    </div>
                  ))}
                </div>
             </motion.div>
          )}

          {/* NOTIFICATIONS LIST */}
          {view === 'notifications' && (
             <motion.div key="notifications" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 flex flex-col bg-[#F8FAFC] overflow-hidden pb-[80px] relative">
                <div className="pt-[44px] pb-3 px-5 bg-white flex items-center justify-between relative shadow-sm z-20">
                  <button onClick={() => setView('home')} className="w-8 h-8 flex items-center justify-center text-[#2f6bff] z-10"><ChevronLeft size={28} strokeWidth={2.5} /></button>
                  <h2 className="text-[#2f6bff] font-extrabold text-[20px] absolute w-full text-center left-0 right-0 top-[48px]">Thông Báo</h2>
                  <div className="bg-[#EEF2FF] px-2 py-1 rounded-full flex items-center gap-1.5 z-10"><span className="text-[12px] font-extrabold text-[#2f6bff]">Mới</span><div className="w-[6px] h-[6px] bg-[#2f6bff] rounded-full"></div></div>
                </div>
                <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                   <div className="px-5 mt-5 flex justify-between items-center mb-4">
                      <div className="bg-[#cddcff] text-[#2f6bff] px-3 py-1 rounded-full text-[12px] font-extrabold">Hôm nay</div>
                      <button className="text-[#2f6bff] text-[12px] font-bold">Đánh dấu tất cả</button>
                   </div>
                   <div className="flex flex-col">
                      <div className="flex gap-3 items-start px-5 py-4 bg-white">
                         <div className="w-[42px] h-[42px] bg-[#2f6bff] rounded-full flex items-center justify-center text-white shrink-0 mt-1 shadow-sm"><Calendar size={20} strokeWidth={2} /></div>
                         <div className="flex-1">
                            <div className="flex justify-between items-start mb-1"><h4 className="font-extrabold text-slate-900 text-[15px] leading-tight pr-4">Đặt Lịch Thành Công</h4><span className="text-slate-400 text-[10px] font-semibold tracking-wider pt-[2px]">2 M</span></div>
                            <p className="text-slate-500 text-[10px] font-semibold leading-[1.4] text-justify tracking-wide">bạn đã đặt thành công lịch khám chuyên khoa da liễu với bác sĩ olivia turner vào lúc 09:00 ngày mai</p>
                         </div>
                      </div>
                      <div className="flex gap-3 items-start px-5 py-4 bg-[#DFE8FF]">
                         <div className="w-[42px] h-[42px] bg-[#2f6bff] rounded-full flex items-center justify-center text-white shrink-0 mt-1 shadow-sm"><Calendar size={20} strokeWidth={2} /></div>
                         <div className="flex-1">
                            <div className="flex justify-between items-start mb-1"><h4 className="font-extrabold text-slate-900 text-[15px] leading-tight pr-4">Thay Đổi Lịch Khám</h4><span className="text-slate-400 text-[10px] font-semibold tracking-wider pt-[2px]">2 H</span></div>
                            <p className="text-slate-500 text-[10px] font-semibold leading-[1.4] text-justify tracking-wide">lịch khám của bạn với bác sĩ alexander bennett đã được dời sang 14:00 ngày 20/04, vui lòng kiểm tra lại.</p>
                         </div>
                      </div>
                      <div className="flex gap-3 items-start px-5 py-4 bg-white">
                         <div className="w-[42px] h-[42px] bg-[#2f6bff] rounded-full flex items-center justify-center text-white shrink-0 mt-1 shadow-sm"><FileText size={20} strokeWidth={2} /></div>
                         <div className="flex-1">
                            <div className="flex justify-between items-start mb-1"><h4 className="font-extrabold text-slate-900 text-[15px] leading-tight pr-4">Ghi Chú Y Tế Mới</h4><span className="text-slate-400 text-[10px] font-semibold tracking-wider pt-[2px]">3 H</span></div>
                            <p className="text-slate-500 text-[10px] font-semibold leading-[1.4] text-justify tracking-wide">bác sĩ olivia turner đã cập nhật lời dặn dò và đơn thuốc mới sau buổi khám của bạn, bấm để xem chi tiết.</p>
                         </div>
                      </div>
                   </div>
                   <div className="px-5 mt-6 mb-4"><div className="bg-[#cddcff] inline-block text-[#2f6bff] px-3 py-1 rounded-full text-[12px] font-extrabold">Hôm qua</div></div>
                   <div className="flex flex-col mb-2">
                      <div className="flex gap-3 items-start px-5 py-4 bg-white">
                         <div className="w-[42px] h-[42px] bg-[#2f6bff] rounded-full flex items-center justify-center text-white shrink-0 mt-1 shadow-sm"><Calendar size={20} strokeWidth={2} /></div>
                         <div className="flex-1">
                            <div className="flex justify-between items-start mb-1"><h4 className="font-extrabold text-slate-900 text-[15px] leading-tight pr-4">Nhắc Nhở Lịch Khám</h4><span className="text-slate-400 text-[10px] font-semibold tracking-wider pt-[2px]">1D</span></div>
                            <p className="text-slate-500 text-[10px] font-semibold leading-[1.4] text-justify tracking-wide">nhắc nhở bạn có lịch hẹn khám vào lúc 10:30 sáng nay. vui lòng đến quầy lễ tân trước 15 phút để làm thủ tục.</p>
                         </div>
                      </div>
                   </div>
                   <div className="px-5 mt-4 mb-4"><div className="bg-[#cddcff] inline-block text-[#2f6bff] px-3 py-1 rounded-full text-[12px] font-extrabold">15 April</div></div>
                   <div className="flex flex-col mb-6">
                      <div className="flex gap-3 items-start px-5 py-4 bg-white">
                         <div className="w-[42px] h-[42px] bg-[#2f6bff] rounded-full flex items-center justify-center text-white shrink-0 mt-1 shadow-sm"><MessageSquare size={20} strokeWidth={2} /></div>
                         <div className="flex-1">
                            <div className="flex justify-between items-start mb-1"><h4 className="font-extrabold text-slate-900 text-[15px] leading-tight pr-4">Cập Nhật Hồ Sơ Bệnh<br/>Án</h4><span className="text-slate-400 text-[10px] font-semibold tracking-wider pt-[2px]">5 D</span></div>
                            <p className="text-slate-500 text-[10px] font-semibold leading-[1.4] text-justify tracking-wide">kết quả xét nghiệm máu và hình ảnh siêu âm của bạn đã được cập nhật vào hệ thống hồ sơ bệnh án điện tử.</p>
                         </div>
                      </div>
                   </div>
                </div>
                <BottomNavigation view={view} setView={setView} selectedDoctor={selectedDoctor} />
             </motion.div>
          )}

          {/* PASSWORD MANAGER */}
          {view === 'passwordManager' && (
             <motion.div key="passwordManager" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 flex flex-col bg-white overflow-hidden pb-[80px] relative">
                <div className="pt-[44px] pb-6 px-5 border-none flex items-center justify-between relative">
                  <button onClick={() => setView('settings')} className="w-8 h-8 flex items-center justify-center text-[#2f6bff] z-10"><ChevronLeft size={28} strokeWidth={2.5} /></button>
                  <h2 className="text-[#2f6bff] font-extrabold text-[20px] absolute w-full text-center left-0 right-0 top-[48px] leading-tight flex flex-col pt-1"><span>Trình Quản Lý Mật</span><span>Khẩu</span></h2>
                  <div className="w-8 h-8" />
                </div>
                <div className="flex-1 px-6 mt-8 space-y-6 overflow-y-auto">
                   <div className="flex flex-col gap-2 relative">
                       <label className="text-[13px] font-extrabold text-slate-800">Mật Khẩu Hiện Tại</label>
                       <div className="relative">
                         <input type={passState.showCurrent ? "text" : "password"} value={passState.current} onChange={e => setPassState({...passState, current: e.target.value})} placeholder="............" className="w-full bg-[#EEF2FF] border-none rounded-[16px] px-5 py-[14px] text-[14px] font-semibold text-[#2f6bff] outline-none focus:ring-2 focus:ring-[#2f6bff]/20 pr-12 tracking-widest" />
                         <button onClick={() => setPassState({...passState, showCurrent: !passState.showCurrent})} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">{passState.showCurrent ? <Eye size={18} /> : <EyeOff size={18} />}</button>
                       </div>
                       <button onClick={() => setView('forgotPassword')} className="text-[#2f6bff] text-[12px] font-semibold self-end mt-1">Forgot Password?</button>
                   </div>
                   <div className="flex flex-col gap-2">
                       <label className="text-[13px] font-extrabold text-slate-800">Mật Khẩu Mới</label>
                       <div className="relative">
                         <input type={passState.showNew ? "text" : "password"} value={passState.new} onChange={e => setPassState({...passState, new: e.target.value})} placeholder="............" className="w-full bg-[#EEF2FF] border-none rounded-[16px] px-5 py-[14px] text-[14px] font-semibold text-[#2f6bff] outline-none focus:ring-2 focus:ring-[#2f6bff]/20 pr-12 tracking-widest" />
                         <button onClick={() => setPassState({...passState, showNew: !passState.showNew})} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">{passState.showNew ? <Eye size={18} /> : <EyeOff size={18} />}</button>
                       </div>
                   </div>
                   <div className="flex flex-col gap-2">
                       <label className="text-[13px] font-extrabold text-slate-800">Xác Nhận Mật Khẩu Mới</label>
                       <div className="relative">
                         <input type={passState.showConfirm ? "text" : "password"} value={passState.confirm} onChange={e => setPassState({...passState, confirm: e.target.value})} placeholder="............" className="w-full bg-[#EEF2FF] border-none rounded-[16px] px-5 py-[14px] text-[14px] font-semibold text-[#2f6bff] outline-none focus:ring-2 focus:ring-[#2f6bff]/20 pr-12 tracking-widest" />
                         <button onClick={() => setPassState({...passState, showConfirm: !passState.showConfirm})} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">{passState.showConfirm ? <Eye size={18} /> : <EyeOff size={18} />}</button>
                       </div>
                   </div>
                </div>
                <div className="p-5 bg-white z-50">
                  <button onClick={() => {alert('Đổi mật khẩu thành công!'); setView('settings');}} className="w-full py-[15px] bg-[#2f6bff] text-white rounded-full font-extrabold text-[15px] shadow-lg shadow-[#2f6bff]/20">Thay Đổi Mật Khẩu</button>
                </div>
             </motion.div>
          )}

        </AnimatePresence>
        
        {/* LOGOUT OVERLAY MODAL */}
        <AnimatePresence>
           {showLogoutModal && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-[100] bg-black/40 flex items-center justify-center px-6" onClick={() => setShowLogoutModal(false)}>
                 <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} onClick={e => e.stopPropagation()} className="bg-white rounded-[24px] w-full p-6 flex flex-col items-center text-center shadow-2xl">
                    <h3 className="text-[#2f6bff] font-extrabold text-[18px] mb-2">Đăng Xuất</h3>
                    <p className="text-[13px] font-semibold text-slate-800 mb-6 px-4">Bạn có chắc chắn muốn đăng xuất không?</p>
                    <div className="flex w-full gap-3">
                       <button onClick={() => setShowLogoutModal(false)} className="flex-1 py-[12px] bg-[#dfe8ff] text-[#2f6bff] rounded-full font-extrabold text-[14px]">Hủy Bỏ</button>
                       <button onClick={() => { setShowLogoutModal(false); setView('login'); }} className="flex-1 py-[12px] bg-[#2f6bff] text-white rounded-full font-extrabold text-[14px] flex flex-col items-center leading-tight pt-1.5 pb-2"><span>Vâng, Đăng</span><span>Xuất</span></button>
                    </div>
                 </motion.div>
              </motion.div>
           )}
        </AnimatePresence>
      </div>
    </div>
  );
}