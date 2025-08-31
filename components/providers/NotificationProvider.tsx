"use client"

import { useAppSocket } from "@/hooks/useAppSocket"
import { useSelector } from "react-redux"
import { RootState } from "@/lib/store"

export function NotificationProvider() {

  const token = useSelector((state: RootState) => state.user.access_token)

  useAppSocket(token)

  return null
}