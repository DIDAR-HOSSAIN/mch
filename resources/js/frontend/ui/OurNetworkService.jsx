import React from 'react';
import servicesBg from '@/assets/images/our_network_services_bg.png';
import service1 from '@/assets/images/services/1.png';
import service2 from '@/assets/images/services/2.png';
import service3 from '@/assets/images/services/3.png';
import service4 from '@/assets/images/services/4.png';
import service5 from '@/assets/images/services/5.png';
import service6 from '@/assets/images/services/6.png';
import service7 from '@/assets/images/services/7.png';
import service8 from '@/assets/images/services/8.png';
import service9 from '@/assets/images/services/9.png';

const OurNetworkService = () => {
    return (

        <>
            <h1 className='text-4xl font-bold text-center text-blue-600/100 mt-4'>Our Network Services</h1>
            <div className="divider divider-start"></div>
            
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-auto mx-auto"
                style={{
                    backgroundImage: `url(${servicesBg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    padding: '20px',
                    display: 'grid',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {/* Your grid items */}
                {[
                    { image: service1, title: 'Network Design & Installation' },
                    { image: service2, title: 'Network Trouble-shotting' },
                    { image: service3, title: 'Firewall Installation' },
                    { image: service4, title: 'WIFI Solution' },
                    { image: service5, title: 'On Site Support' },
                    { image: service6, title: 'Aging Hardware' },
                    { image: service7, title: 'Network Monitoring 24/7 Support' },
                    { image: service8, title: 'Wireless Access Point Setup' },
                    { image: service9, title: 'Server Installation' },
                ].map((service, index) => (
                    <div
                        key={index}
                        className="relative rounded-xl overflow-hidden border border-blue-600 p-4 m-2"
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                        }}
                    >
                        <img className="" src={service.image} alt={`Service ${index + 1}`} />
                        <div className="absolute inset-0 flex items-center justify-center text-center text-white">
                            <h2 className="text-2xl font-bold">{service.title}</h2>
                        </div>
                    </div>
                ))}
            </div>
        </>

    );
};

export default OurNetworkService;