// src/components/LoginPage.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // استيراد useNavigate
import './LoginScreen.css';
import icon from '../images/icon.jpeg';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // استخدام useNavigate

  const handleLogin = (e) => {
    e.preventDefault();
    // هنا يمكنك إضافة منطق تحقق من بيانات تسجيل الدخول
    console.log("Login attempted with:", { email, password });
    
    // بعد التحقق، انتقل إلى الصفحة الرئيسية
    navigate('/'); // إعادة توجيه إلى الصفحة الرئيسية (Home)
  };

  return (
    <div className="login-container">
      <img className='logo' src={icon} alt='logo' />
      <h3 className='title'> مرحبا بك في رئاسة فوج المقر للاستعلامات بجهاز مستقبل مصر</h3>
      
      <section className='description'>
      <h2>إدارة فوج المقر</h2>
      <p>
        إدارة فوج المقر هي جهة تنظيمية تهدف إلى تقديم خدمات الاستعلامات والمساعدة للأفراد والزوار، حيث تعمل كحلقة وصل بين المواطنين والجهات الرسمية. تركز الإدارة على تحقيق تواصل فعال بين العملاء والجهاز وتقديم الدعم اللازم.
      </p>
    
      <h4>الوظائف الرئيسية</h4>
      <ul>
        <li>
          <h4>تقديم المعلومات</h4>
          <p>توفر الإدارة معلومات شاملة حول الخدمات المقدمة من قبل الجهاز، وتساعد في توجيه الزوار إلى الأقسام المناسبة.</p>
        </li>
        <li>
          <h4>استقبال الزوار</h4>
          <p>تستقبل الإدارة الزوار وتقدم لهم الدعم اللازم، بما في ذلك إرشادات حول كيفية تقديم الطلبات والخدمات المتاحة.</p>
        </li>
        </ul>
    </section>
      <div className="login-box">
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">اسم المستخدم</label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ادخل اسم المستخدم"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">الرقم السري</label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="ادخل الرقم السري"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">سجل دخول</button>
      </form>

      <div className="social-login mt-3">
        <button className="btn btn-secondary w-100">ادخل كزائر</button>
      </div>
    </div>
    </div>
  );
};

export default LoginPage;
