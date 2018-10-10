import React from 'react'

const ConditionalInput = (props) => {
    if(props.founderOption) {
        return (
            <div className="form-group">
                <label for="founder">Founder Address</label>
                <input type="string" className="form-control" placeholder="New Address" onChange={(e) => props.founderChange(e)} />
            </div>
        )
    } else {
        return null
    }
}

export default ConditionalInput
