'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ContactPage() {
  const [showModal, setShowModal] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Dynamically load jQuery and jquery.form plugin, then bind the submit handler
    const loadScript = (src: string) =>
      new Promise<void>((resolve, reject) => {
        const s = document.createElement('script')
        s.src = src
        s.async = true
        s.onload = () => resolve()
        s.onerror = () => reject(new Error(`Failed to load ${src}`))
        document.head.appendChild(s)
      })

    const jQueryCdn = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js'
    const jQueryFormCdn = 'https://cdnjs.cloudflare.com/ajax/libs/jquery.form/4.2.2/jquery.form.min.js'

    let mounted = true
    // Create a hidden iframe fallback so we can submit without navigating away
    const frameName = 'gh_submit_frame'
    let submitFrame: HTMLIFrameElement | null = document.getElementsByName(frameName)[0] as HTMLIFrameElement | null
    if (!submitFrame) {
      submitFrame = document.createElement('iframe')
      submitFrame.name = frameName
      submitFrame.style.display = 'none'
      document.body.appendChild(submitFrame)
    }
    let submitting = false
    const onFrameLoad = () => {
      if (submitting) {
        submitting = false
        setShowModal(true)
      }
    }
    submitFrame.addEventListener('load', onFrameLoad)

    loadScript(jQueryCdn)
      .then(() => loadScript(jQueryFormCdn))
      .then(() => {
        if (!mounted) return
        const $ = (window as any).jQuery || (window as any).$
        if (!$) return

        $('#bootstrapForm').on('submit', function (event: any) {
          event.preventDefault()
          const extraData: any = {}
          // Ensure the form posts into the hidden iframe so we don't navigate away
          try { (this as HTMLFormElement).target = frameName } catch (e) {}
          submitting = true
          // Use ajaxSubmit provided by jquery.form — call on jQuery-wrapped element
          const $form = (this && (window as any).jQuery) ? (window as any).jQuery(this) : null
          if ($form && (typeof $form.ajaxSubmit === 'function')) {
            $form.ajaxSubmit({
              data: extraData,
              dataType: 'jsonp',
              error: function () {
                // Google Forms does not support JSONP; treat error as success
                submitting = false
                setShowModal(true)
              },
            })
          } else {
            // Fallback: submit into the hidden iframe — onload will show modal
            try { (this as HTMLFormElement).submit() } catch (e) { submitting = false }
          }
        })
      })
      .catch(() => {
        // ignore load errors; users can still submit via default POST behavior
      })

    return () => {
      mounted = false
    }
  }, [])

  return (
    <main className="pt-24 pb-20 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-3 tracking-tight">
            Let’s work together
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Share a few details and I’ll get back within 1–2 business days.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8">
          {/* Google Form - DO NOT CHANGE IDs, names or endpoint */}
          <form
            action="https://docs.google.com/forms/d/e/1FAIpQLScq2CuXrBqHINVPEukIoZu5U3Y9lSwnN9PR30oRFhhvDUrSKA/formResponse"
            target="_self"
            id="bootstrapForm"
            method="POST"
            className="space-y-6"
          >
            <fieldset>
              <h2 className="sr-only">Contact Form on Portfolio Website</h2>
            </fieldset>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="952164786" className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
                  Name
                </label>
                <input id="952164786" type="text" name="entry.952164786" className="w-full px-5 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
              </div>

              <div>
                <label htmlFor="134509771" className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
                  Email
                </label>
                <input id="134509771" type="text" name="entry.134509771" className="w-full px-5 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="1157405561" className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  Phone (Optional)
                </label>
                <input id="1157405561" type="text" name="entry.1157405561" className="w-full px-5 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>

              <div>
                <label htmlFor="1097748670" className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  Organization / Company (Optional)
                </label>
                <input id="1097748670" type="text" name="entry.1097748670" className="w-full px-5 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
            </div>

            <div>
              <label htmlFor="844904308" className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
                Subject
              </label>
              <input id="844904308" type="text" name="entry.844904308" className="w-full px-5 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>

            <div>
              <label htmlFor="1411447157" className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
                Message
              </label>
              <textarea id="1411447157" name="entry.1411447157" className="w-full px-5 py-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500" rows={6} />
            </div>

            <input type="hidden" name="fvv" value="1" />
            <input type="hidden" name="fbzx" value="5145165369736482462" />
            <input type="hidden" name="pageHistory" value="0" />

            <div className="mt-2">
              <input className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md" type="submit" value="Send Message" />
            </div>
          </form>
        </div>

        {/* Modal shown after successful submission (or when JSONP fails) */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-black/50" onClick={() => setShowModal(false)} />
            <div className="relative bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-2xl p-8 max-w-md w-full shadow-2xl ring-1 ring-black/5">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-100 text-green-700 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414L8.414 15 5 11.586a1 1 0 011.414-1.414L8.414 12.172l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-1">Message sent</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">Thanks — your message has been submitted. I will get back to you shortly.</p>
                </div>
              </div>
              <div className="mt-4 text-right">
                <button onClick={() => { setShowModal(false); router.push(`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/projects`) }} className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold">
                  View projects
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
