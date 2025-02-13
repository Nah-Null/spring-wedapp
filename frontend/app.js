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
         // ตรวจสอบว่ามีผู้ใช้งานที่ใช้อีเมลนี้อยู่แล้วหรือไม่
         const checkmail = await fetch(`http://localhost:4000/users/getByEmail?email=${email}`);
         const checkname = await fetch(`http://localhost:4000/users/getByName?name=${name}`);
         if (checkmail.ok) {
             const Datamail = await checkmail.json();
             const Dataname = await checkname.json();
             if (Datamail.email === email && Dataname.name === name) {
                 alert("Email และชื่อผู้ใช้นี้มีผู้ใช้งานแล้ว กรุณาใช้อีเมลและชื่ออื่น");
                 return;
             } else if (Datamail.email === email) {
                 alert("Email นี้มีผู้ใช้งานแล้ว กรุณาใช้อีเมลอื่น");
                 return;
             } else if (Dataname.name === name) {
                 alert("ชื่อนี้มีผู้ใช้งานแล้ว กรุณาใช้ชื่ออื่น");
                 return;
             }
         }

        // เพิ่มผู้ใช้ใหม่ลงในฐานข้อมูล
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
            getUsers(); // เรียกใช้ฟังก์ชัน getUsers เพื่อดึงข้อมูลผู้ใช้ทั้งหมด
        } else {
            console.error("❌ Failed to add user:", data);
        }
    } catch (error) {
        console.error("⚠️ Fetch Error:", error);
    }

    toggleForm();
}

// ฟังก์ชันดึงข้อมูลผู้ใช้ทั้งหมด
async function getUsers() {
    try {
        const response = await fetch("http://localhost:4000/users/getallusers");
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        
        console.log("Fetched all users:", data);
        // คุณสามารถเพิ่มโค้ดเพื่อแสดงข้อมูลผู้ใช้ทั้งหมดในหน้าเว็บได้ที่นี่
    } catch (error) {
        console.error("Error fetching all users:", error);
    }
}

// ฟังก์ชันตรวจสอบข้อมูล Login
async function check_up() {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    localStorage.setItem('email', email);

    try {
        const response = await fetch(`http://localhost:4000/users/getuser?email=${email}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        
        console.log("Fetched data:", data);

        if (data && data.email === email) {
            if (data.password === password) {
                alert("Login successful!");
                open_member();
            } else {
                alert("Invalid email or password");
            }
        } else {
            console.error("Expected an object but got:", data);
            alert("Something went wrong. Please try again later.");
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
        alert("Something went wrong. Please try again later.");
    }
}

async function open_member() {
    const memberForm = document.getElementById('Mumber-Form');
    const loginForm = document.getElementById('login-form');

    loginForm.classList.add('d-none');
    memberForm.classList.remove('d-none');

    document.getElementById('login-email').value = '';
    document.getElementById('login-password').value = '';

    try {
        const response = await fetch(`http://localhost:4000/users/getuser?email=${localStorage.getItem('email')}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();

        document.getElementById('name').innerText = data.name;
        document.getElementById('email').innerText = data.email;
    } catch (error) {
        console.error("Error fetching user data:", error);
    }
}

// ฟังก์ชันสำหรับออกจากระบบ
function logout() {
    localStorage.removeItem('email');

    const memberForm = document.getElementById('Mumber-Form');
    const loginForm = document.getElementById('login-form');

    memberForm.classList.add('d-none');
    loginForm.classList.remove('d-none');

    document.getElementById('login-email').value = '';
    document.getElementById('login-password').value = '';
    alert("คุณได้ออกจากระบบเรียบร้อยแล้ว");
}
