import { renderStringWithLink } from '@/redux/utils'
import React from 'react'

export default function ColorPost({ postInformation }) {
    return (
        <div className="color-description" style={{ backgroundColor: `#${postInformation.post_background_color}` }}>
            <p
                dangerouslySetInnerHTML={renderStringWithLink(
                    postInformation.description
                )}
            />
        </div>
    )
}
