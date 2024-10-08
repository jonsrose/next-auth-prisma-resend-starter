'use client'

import { withAuth } from '@/components/withAuth'

function HiPage() {
  return (
    <div>
      <h1>Hi</h1>
    </div>
  )
}

export default withAuth(HiPage)