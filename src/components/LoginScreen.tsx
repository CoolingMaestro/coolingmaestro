import React, { useState } from 'react';
import styles from './LoginScreen.module.css';
import { Button, Form, Input, Checkbox, Divider, Typography } from 'antd';
import {
UserOutlined,
LockOutlined,
EyeTwoTone,
EyeInvisibleOutlined,
GoogleOutlined,
LinkedinOutlined
} from '@ant-design/icons';
const { Title, Text, Paragraph } = Typography;
interface LoginScreenProps {
  onLoginSuccess?: () => void;
  onBackToHome?: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess, onBackToHome }) => {
const [form] = Form.useForm();
const [showPassword, setShowPassword] = useState<boolean>(false);
const onFinish = (values: any) => {
console.log('Form values:', values);
// Simulate login success
if (onLoginSuccess) {
  onLoginSuccess();
}
};
return (
<div className={styles.loginScreen}>
<div className={styles.loginContainer}>
{/* Left Side - Branding */}
<div className={styles.brandingSection}>
<div className={styles.brandingText}>
<div className="flex items-center mb-12">
<img
src="https://readdy.ai/api/search-image?query=A%2520professional%2520sleek%2520modern%2520logo%2520for%2520Cooling%2520Maestro%2520featuring%2520a%2520stylized%2520snowflake%2520or%2520cooling%2520symbol%2520with%2520blue%2520gradient%2520colors.%2520The%2520logo%2520should%2520be%2520minimalist%2520corporate%2520and%2520suitable%2520for%2520an%2520industrial%2520cooling%2520calculation%2520software.%2520Clean%2520background%2520high%2520contrast.&width=60&height=60&seq=1&orientation=squarish"
alt="Cooling Maestro Logo"
className="h-12 w-12 object-contain mr-3"
/>
<div>
<h1 className="text-2xl font-bold">Cooling Maestro</h1>
<p className="text-sm text-blue-100">Endüstriyel Soğutma Çözümleri</p>
</div>
</div>
<Title level={2} className="text-3xl font-bold text-white mb-6">
Cooling Maestro'ya Hoş Geldiniz
</Title>
<Paragraph className="text-blue-100 text-lg mb-8">
Endüstriyel soğutma hesaplamalarınızı hızlı, doğru ve güvenilir bir şekilde yapmanızı sağlayan profesyonel platformumuza hoş geldiniz.
</Paragraph>
<div className={styles.checkItem}>
<span className={`${styles.icon} ${styles.iconCheckCircle}`}></span>
<span>ASHRAE ve TS EN standartlarına uygun hesaplamalar</span>
</div>
<div className={styles.checkItem}>
<span className={`${styles.icon} ${styles.iconCheckCircle}`}></span>
<span>Profesyonel raporlama ve sistem konfigürasyonu</span>
</div>
<div className={styles.checkItem}>
<span className={`${styles.icon} ${styles.iconCheckCircle}`}></span>
<span>Zaman ve maliyet tasarrufu sağlayan çözümler</span>
</div>
</div>
<img
src="https://readdy.ai/api/search-image?query=A%2520professional%2520illustration%2520of%2520industrial%2520cooling%2520system%2520with%2520abstract%2520digital%2520elements%2520and%2520calculation%2520formulas%2520floating%2520around.%2520The%2520image%2520has%2520a%2520blue%2520gradient%2520background%2520that%2520perfectly%2520matches%2520the%2520login%2520page%2520design.%2520The%2520illustration%2520is%2520modern%2520minimalist%2520and%2520suitable%2520for%2520a%2520professional%2520engineering%2520software%2520interface.&width=500&height=300&seq=2&orientation=landscape"
alt="Industrial Cooling Illustration"
className={styles.backgroundIllustration}
/>
</div>
{/* Right Side - Login Form */}
<div className={styles.formSection}>
<div className={styles.formContainer}>
<div className={styles.mobileLogoContainer}>
<img
src="https://readdy.ai/api/search-image?query=A%2520professional%2520sleek%2520modern%2520logo%2520for%2520Cooling%2520Maestro%2520featuring%2520a%2520stylized%2520snowflake%2520or%2520cooling%2520symbol%2520with%2520blue%2520gradient%2520colors.%2520The%2520logo%2520should%2520be%2520minimalist%2520corporate%2520and%2520suitable%2520for%2520an%2520industrial%2520cooling%2520calculation%2520software.%2520Clean%2520background%2520high%2520contrast.&width=60&height=60&seq=1&orientation=squarish"
alt="Cooling Maestro Logo"
className="h-12 w-12 object-contain mr-3"
/>
<div>
<h1 className="text-2xl font-bold text-gray-800">Cooling Maestro</h1>
<p className="text-sm text-gray-500">Endüstriyel Soğutma Çözümleri</p>
</div>
</div>
<Title level={3} className="text-2xl font-bold text-gray-800 mb-2">
Giriş Yap
</Title>
<Text className="text-gray-500 block mb-8">
Hesabınıza erişmek için giriş yapın
</Text>
<Form
form={form}
name="login"
layout="vertical"
onFinish={onFinish}
autoComplete="off"
className="w-full"
>
<Form.Item
name="email"
rules={[{ required: true, message: 'Lütfen e-posta adresinizi girin!' }]}
>
<Input
size="large"
placeholder="E-posta Adresi"
prefix={<UserOutlined className="text-gray-400" />}
className={styles.inputField}
/>
</Form.Item>
<Form.Item
name="password"
rules={[{ required: true, message: 'Lütfen şifrenizi girin!' }]}
className="mb-2"
>
<Input.Password
size="large"
placeholder="Şifre"
prefix={<LockOutlined className="text-gray-400" />}
iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
className={styles.inputField}
/>
</Form.Item>
<div className="flex justify-between items-center mb-6">
<Form.Item name="remember" valuePropName="checked" noStyle>
<Checkbox className="text-gray-600">Beni Hatırla</Checkbox>
</Form.Item>
<Button type="link" className={`${styles.link} ${styles.roundedButton} whitespace-nowrap cursor-pointer`}>
Şifremi Unuttum
</Button>
</div>
<Form.Item>
<Button
type="primary"
htmlType="submit"
size="large"
block
className={`${styles.primaryButton} ${styles.roundedButton} whitespace-nowrap cursor-pointer`}
>
Giriş Yap
</Button>
</Form.Item>
</Form>
<Divider className="my-6">
<span className={styles.dividerText}>veya</span>
</Divider>
<div className="space-y-4">
<Button
size="large"
block
icon={<GoogleOutlined />}
className={`${styles.socialButton} whitespace-nowrap cursor-pointer`}
>
Google ile Giriş Yap
</Button>
<Button
size="large"
block
icon={<LinkedinOutlined />}
className={`${styles.socialButton} whitespace-nowrap cursor-pointer`}
>
LinkedIn ile Giriş Yap
</Button>
</div>
<div className="text-center mt-8">
<Text className="text-gray-600">
Hesabınız yok mu? <Button type="link" className="p-0 text-blue-600 hover:text-blue-800 !rounded-button whitespace-nowrap cursor-pointer">Hemen Kayıt Olun</Button>
</Text>
</div>
</div>
</div>
</div>
</div>
);
};
export default LoginScreen;