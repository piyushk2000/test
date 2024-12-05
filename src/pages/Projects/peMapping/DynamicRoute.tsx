import { isAdmin, isClient, isSuperAdmin } from '../../../utils/role'
import ProfileShared from '../../Profile-shared'
import PEExpertMapping from '.'

export default function PEMappingDynamicRoute() {
  return (
    (isAdmin() || isSuperAdmin()) ? <PEExpertMapping /> : <ProfileShared />
  )
}