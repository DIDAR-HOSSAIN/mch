import FrontendLayout from "@/frontend/Layout/FrontendLayout";
import { Head } from "@inertiajs/react";
import React from "react";
import aboutBg from "./../assets/images/about-us-bg.png";

const About = ({ auth }) => {
    return (
        <FrontendLayout
            user={auth.user}
            header={
                <h1 className="font-semibold text-xl text-gray-800 leading-tight">
                    About Page
                </h1>
            }
        >
            <Head className="text-2xl font-semibold mb-4" title="About Page" />

            <div className='mt-10 p-4 shadow-2xl text-lg bg-cover' style={{ backgroundImage: "url(" + aboutBg + ")" }}>
            <h1 className='text-sky-400 bg-black text-3xl p-4 text-center rounded-md'> About Us
            
            </h1>

            <div className="m-10 text-justify ">
            <p className=''><strong>Our company offers a comprehensive range of IT services to help businesses of all sizes achieve their goals. Our Services include:</strong> </p>
<br/>
            <p className=''><strong>Web Design:</strong> We provide professional and responsive web design services that are tailored to the unique needs of our clients. Our team of experts can create custom websites that are optimized
            for search engines and easy to navigate.</p>
<br/>
            <p className=''><strong>Software Development:</strong> We offer custom software development services to help businesses automate processes and improve efficiency. Our team of skilled developers can create software solutions that are tailored to the specific needs of our clients.</p>
<br/>
            <p className=''><strong>IT Project:</strong> We have experience in managing and delivering IT projects of all sizes, from small projects to large enterprise - level initiatives. Our team of experts can help you plan, execute, and deliver your IT projects on time and within budget.</p>
<br/>
            <p className=''><strong>Network Design and Implementation:</strong> We can help you design and implement a network infrastructure that is reliable, secure, and scalable. Our team of experts can provide network design, installation, and maintenance services.</p>
<br/>
            <p className=''><strong>IT Support:</strong> We offer IT support services to help businesses keep their systems running smoothly. Our team of experts can provide troubleshooting and maintenance services to ensure that your systems are always up to date and running efficiently.</p>
<br/>
            <p className=''><strong>Managed IT Support:</strong> We offer managed IT support services to help businesses manage and maintain their IT systems. Our team of experts can provide remote and on - site support, as well as proactive monitoring and maintenance services.</p>
<br/>            
            <p className=''><strong>IT Relocation Services:</strong> We can help businesses with their IT relocation needs, including planning, execution, and post - move support. Our team of experts can help you move your IT systems and equipment safely and efficiently.</p>
<br/>
            <p className=''><strong>Graphics Designing:</strong> Our team of professional graphic designers can create visually appealing graphics and designs that will help you attract more customers and stand out from your competition.</p>
            <p className=''>Overall, our goal is to provide our clients with the highest quality IT services, from web design to software development, IT project, Network design and implementation, IT support, Managed IT support, IT Relocation Services & Graphics Designing to help them achieve their goals.</p>
            </div>
            
        </div>
            
        </FrontendLayout>
    );
};

export default About;
