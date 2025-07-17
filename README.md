## 🛠 Setup Project

### Prerequisites
- Node.js (v18 atau lebih baru)
- MongoDB
- npm 

### Langkah Instalasi
1. Clone repository
    ```bash
    git clone git@github.com:anjarw83/cipta-api.git
    cd cipta-api
    ```

2. Install Dependecies
    ```
    npm install
    ```

3. Setup (Environment)

   Edit file `.env` dengan konfigurasi yang sesuai:
    ```
    PORT=3000
    MONGODB_URI=mongodb://localhost:27017
    JWT_SECRET=c8e3d6f4a1b2e9h7k5m8n3p6r9t2w4y7
    ```
4. Run Migration Script (optional)
   ```bash 
   npm run migrate-up 
   ```

6. Jalankan Aplikasi
    ```
    npm run start
    ```
    Server akan berjalan di `http://localhost:3000` atau sesuai `PORT` yang dikonfigurasi
   
# API Transaksi

---

Selamat datang di dokumentasi API Transaksi! API ini dirancang untuk mengelola data transaksi pengguna dengan mudah dan efisien.

---

## 🚀 Memulai

### Base URL

Semua *endpoint* mengacu pada *base URL* berikut:

`https://your-api-domain.com/api/v1` atau pada contoh ini menggunakan `http://localhost:{PORT|3000}`

### Otentikasi

Semua *endpoint* transaksi memerlukan otentikasi menggunakan **Bearer Token**. Pastikan Anda menyertakan *header* `Authorization` dengan format:

`Authorization: Bearer {token_anda_di_sini}`

---

## 🔍 *Endpoints* User Login & Registrasi

### 1. Melakukan Registrasi User Baru

Membuat User Baru dengan
```http
POST /register
```

Body/Payload: 
```json
{
   "name": "sahid",
   "email": "sahid@mailinator.com",
   "password": "password123"
}
```

Contoh Response: 
```json
{
  "success": true,
  "message": "Successfully Registered",
  "data": {
    "id": "687866a170e9a9db9467c96d",
    "name": "sahid",
    "email": "sahid@mailinator.com",
    "password": "$2b$10$dRmTWMgb/IR1.4rX7ScSjuHfG.7eGHbLdyAj5WQUJH4UW7qHeNBqi",
    "createdAt": "2025-07-17T02:57:37.707Z",
    "updatedAt": "2025-07-17T02:57:37.707Z"
  }
}
```

### 2. User Login
```http
POST /login 
```

Body/Payload :
```json
{
   "name": "sahid",
   "email": "sahid@mailinator.com",
   "password": "password123"
}
```

Contoh Response : 
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4Nzg2NmExNzBlOWE5ZGI5NDY3Yzk2ZCIsImVtYWlsIjoic2FoaWRAbWFpbGluYXRvci5jb20iLCJpYXQiOjE3NTI3MjE0MTAsImV4cCI6MTc1MjcyNTAxMH0.Dzt_U0zipo3gQmJs-e6_VHd4V50q1qifLTm5ngZMzig"
}
```

## 🔍 *Endpoints* Transaksi

### 1. Mendapatkan Daftar Transaksi

Mengambil semua riwayat transaksi yang tersedia.

```http
GET /transaction
```
Header : 
- Authorization: Bearer `{token}` (token wajib)

Contoh Response:
```json
{
  "status": true,
  "message": "Data Ditemukan",
  "data": [
    {
      "id": "trans_123abc",
      "user_id": "user_456def",
      "amount": "100000.00",
      "created_at": "2025-07-17T10:30:00Z",
      "updated_at": "2025-07-17T10:30:00Z"
    },
    {
      "id": "trans_789ghi",
      "user_id": "user_101jkl",
      "amount": "50000.50",
      "created_at": "2025-07-16T15:00:00Z",
      "updated_at": "2025-07-16T15:00:00Z"
    }
  ]
} 
```

### 2. Membuat Transaksi Baru
```http
POST /transaction/process
```
Header :
- Authorization: Bearer `{token}` (token wajib)

Body/Payload:
```json
{
  "amount": "2100000"
}
```

Contoh Response: 
```json
{
   "status": true,
   "message": "Data Created",
   "data": {
      "id": "68786b2170e9a9db9467c972",
      "user_id": "687866a170e9a9db9467c96d",
      "amount": "2100000",
      "created_at": "2025-07-17T03:16:49.454Z",
      "updated_at": "2025-07-17T03:16:49.454Z"
   }
}
```

### 3. Mengupdate Transaksi yang ada
```http
POST /transaction/process?id={id}
```
Header :
- Authorization: Bearer `{token}` (token wajib)

Parameter:
- id : `id` transaksi user terkait

Contoh Response:
```json
{
   "status": true,
   "message": "Data Updated",
   "data": {
      "id": "68786b2170e9a9db9467c972",
      "user_id": "687866a170e9a9db9467c96d",
      "amount": "155000",
      "created_at": "2025-07-17T03:16:49.454Z",
      "updated_at": "2025-07-17T03:22:15.747Z"
   }
}
```

