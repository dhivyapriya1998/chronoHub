import React from "react";

const Header = ({icons})=>{
    return(
<Header style={{ backgroundColor: '#012E5B' }}>
            <div className="flex space-x-4">
                {icons.map((IconComponent,index)=>(
                    <IconComponent key={index} className="w-6 h-6 cursor-pointer hover:text-yellow-300" />
                ))}
            </div>
        </Header>
        
    )

}
export default Header