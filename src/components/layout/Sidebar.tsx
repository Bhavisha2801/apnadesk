import Link from 'next/link'
import React from 'react'

const Sidebar = () => {
  return (
    <div>
        <Link href="/customers">
            Customers
        </Link>

        <Link href="/forms">
            Forms
        </Link>

        <Link href="/responses">
            Responses
        </Link>
    </div>
  )
}

export default Sidebar;
