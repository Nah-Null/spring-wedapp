// ฟังก์ชันสลับระหว่างฟอร์ม Login และ Sign Up
function toggleForm() {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    
    // สลับการแสดงผลของฟอร์ม Login และ Sign Up
    loginForm.classList.toggle('d-none');
    signupForm.classList.toggle('d-none');
}

// ฟังก์ชันเก็บข้อมูลจากฟอร์ม Sign Up และบันทึกลงใน MySQL
async function storeInputValues() {
    const name = document.getElementById("signup-name").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    
    console.log("🚀 Sending Data:", { name, email, password });

    try {
        const response = await fetch("http://localhost:4000/users/adduser", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password })
        });

        console.log("🔄 Response Status:", response.status);
        const data = await response.json();
        console.log("✅ Server Response:", data);

        if (response.ok) {
            alert("User added successfully!");
            getUsers();
        } else {
            console.error("❌ Failed to add user:", data);
        }
    } catch (error) {
        console.error("⚠️ Fetch Error:", error);
    }

    alert("สมัครสมาชิกสำเร็จ");
    toggleForm();
}

// ฟังก์ชันตรวจสอบข้อมูล Login
async function check_up() {
    // ดึงข้อมูลจากฟอร์ม
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    localStorage.setItem('email', email);

    try {
        // ดึงข้อมูลจาก API ที่เชื่อมต่อกับฐานข้อมูล
        const response = await fetch("http://localhost:4000/users/getuser?email=" + email); // ปรับ URL ให้ตรงกับ API ที่คุณใช้งาน
        const data = await response.json(); // แปลงข้อมูลที่ได้รับเป็น JSON
        
        console.log("Fetched data:", data); // ตรวจสอบข้อมูลที่ได้รับ

        // ตรวจสอบว่ามีผู้ใช้ที่ตรงกับอีเมลที่กรอกหรือไม่
        if (data && data.email === email) {
            if (data.password === password) {
                // หากข้อมูลตรงกัน ให้ดำเนินการต่อไป
                alert("Login successful!");
                open_member(); // ทำงานต่อไป (เปลี่ยนหน้าหรือทำอะไรเพิ่มเติม)
            } else {
                // หากข้อมูลไม่ตรง ให้แสดงข้อความเตือน
                alert("Invalid email or password");
            }
        } else {
            console.error("Expected an object but got:", data);
            alert("Something went wrong. Please try again later.");
        }
    } catch (error) {
        // หากเกิดข้อผิดพลาดในการดึงข้อมูลจาก API
        console.error("Error fetching user data:", error);
        alert("Something went wrong. Please try again later.");
    }
}

async function open_member() {
    const memberForm = document.getElementById('Mumber-Form');  // ฟอร์มสมาชิก
    const loginForm = document.getElementById('login-form');

    
    // สลับการแสดงผลของฟอร์ม Login และ ฟอร์มสมาชิก
    loginForm.classList.add('d-none');  // ซ่อนฟอร์ม Login
    memberForm.classList.remove('d-none');  // แสดงฟอร์มสมาชิก
    
    // เคลียร์ค่าฟอร์ม Login หลังจากเข้าสู่ระบบสำเร็จ
    document.getElementById('login-email').value = '';
    document.getElementById('login-password').value = '';

    // ดึงข้อมูลจาก localStorage มาแสดงในฟอร์มสมาชิก
    const email = document.getElementById("login-email").value;
    const response = await fetch("http://localhost:4000/users/getuser?email=" + localStorage.getItem('email')); // ปรับ URL ให้ตรงกับ API ที่คุณใช้งาน
    const data = await response.json(); // แปลงข้อมูลที่ได้รับเป็น JSON
    console.log(data.name);
    alert(data.name);
    // document.getElementById('email').innerText = localStorage.getItem('email'); // แสดงชื่อ

}

// ฟังก์ชันสำหรับออกจากระบบ
function logout() {
    // ลบข้อมูลใน localStorage
    localStorage.removeItem('name');
    localStorage.removeItem('username');
    localStorage.removeItem('password');

    // ซ่อนฟอร์มสมาชิกและแสดงฟอร์ม Login
    const memberForm = document.getElementById('Mumber-Form');
    const loginForm = document.getElementById('login-form');

    memberForm.classList.add('d-none'); // ซ่อนฟอร์มสมาชิก
    loginForm.classList.remove('d-none'); // แสดงฟอร์ม Login

    // เคลียร์ค่าฟอร์ม
    document.getElementById('login-email').value = '';
    document.getElementById('login-password').value = '';
    alert("คุณได้ออกจากระบบเรียบร้อยแล้ว");
}