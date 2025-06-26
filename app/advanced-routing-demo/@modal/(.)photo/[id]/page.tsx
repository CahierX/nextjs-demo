import { Modal } from '../../../components/Modal'
import { Photo } from '../../../components/PhotoSimple'

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default async function PhotoModalPage({ params }: PageProps) {
  const { id } = await params
  return (
    <Modal>
      <Photo id={id} />
    </Modal>
  )
}
