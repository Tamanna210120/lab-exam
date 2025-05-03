import { useEffect, useState } from "react";
import { FiSearch, FiInfo, FiClock, FiMapPin, FiBriefcase } from "react-icons/fi";

const Home = () => {
    const [companies, setCompanies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('companies.json');
                const data = await response.json();
                setCompanies(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchData();
    }, []);

    const filteredCompanies = companies.filter(company =>
        company.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* Header with Search */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Company Directory</h1>
                    <p className="text-gray-600">
                        {filteredCompanies.length} {filteredCompanies.length === 1 ? 'company' : 'companies'} found
                    </p>
                </div>
                
                <div className="relative w-full md:w-80">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiSearch className="text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search companies..."
                        className="input input-bordered w-full pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Table Container */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                {isLoading ? (
                    <div className="p-8 text-center">
                        <span className="loading loading-spinner loading-lg"></span>
                        <p className="mt-4 text-gray-600">Loading companies...</p>
                    </div>
                ) : filteredCompanies.length === 0 ? (
                    <div className="p-8 text-center">
                        <div className="text-gray-400 mb-4">
                            <FiSearch className="inline-block text-4xl" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-700">
                            {searchTerm ? 'No matching companies found' : 'No companies available'}
                        </h3>
                        <p className="mt-1 text-gray-500">
                            {searchTerm ? 'Try a different search term' : 'Check back later or add new companies'}
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            {/* Table Header */}
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="w-12">Sl NO</th>
                                    <th className="min-w-[200px]">Company</th>
                                    <th className="min-w-[150px]">
                                        <div className="flex items-center gap-1">
                                            <FiBriefcase className="text-gray-400" />
                                            <span>Sector</span>
                                        </div>
                                    </th>
                                    <th className="min-w-[150px]">
                                        <div className="flex items-center gap-1">
                                            <FiMapPin className="text-gray-400" />
                                            <span>Headquarter</span>
                                        </div>
                                    </th>
                                    <th className="min-w-[120px]">
                                        <div className="flex items-center gap-1">
                                            <FiClock className="text-gray-400" />
                                            <span>Founded</span>
                                        </div>
                                    </th>
                                    
                                </tr>
                            </thead>
                            
                            {/* Table Body */}
                            <tbody className="divide-y divide-gray-200">
                                {filteredCompanies.map((company, index) => (
                                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                                        <td>
                                            {index+1}
                                        </td>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle h-10 w-10">
                                                        <img 
                                                            src={company.logo} 
                                                            alt={company.name} 
                                                            onError={(e) => {
                                                                e.target.onerror = null; 
                                                                e.target.src = 'https://via.placeholder.com/40';
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-gray-800">{company.name}</div>
                                                    <div className="text-xs text-gray-500">{company.ticker}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                                                {company.sector}
                                            </span>
                                        </td>
                                        <td className="text-gray-700">{company.headquarter}</td>
                                        <td className="text-gray-700">{company.founded}</td>
                                        
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Pagination would go here */}
            {filteredCompanies.length > 0 && (
                <div className="mt-4 flex justify-end">
                    <div className="join">
                        <button className="join-item btn btn-sm">«</button>
                        <button className="join-item btn btn-sm btn-active">1</button>
                        <button className="join-item btn btn-sm">2</button>
                        <button className="join-item btn btn-sm">3</button>
                        <button className="join-item btn btn-sm">»</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;