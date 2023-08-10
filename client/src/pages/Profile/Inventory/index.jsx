import { useState } from 'react'
import { Button } from 'antd'

import InventoryForm from './InventoryForm'

const Inventory = () => {
    const [open, setOpen] = useState(false)

    return (
        <div>
            <div className="flex justify-end">
                <Button type="default" onClick={() => setOpen(true)}>Add Inventory</Button>
            </div>

            <InventoryForm	open={open} setOpen={setOpen} />
        </div>
    )
}

export default Inventory