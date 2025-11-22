'use client'

import { useEffect, useState } from 'react'

export default function ContactPage() {
  const [showModal, setShowModal] = useState(false)

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

    loadScript(jQueryCdn)
      .then(() => loadScript(jQueryFormCdn))
      .then(() => {
        if (!mounted) return
        const $ = (window as any).jQuery || (window as any).$
        if (!$) return

        $('#bootstrapForm').on('submit', function (event: any) {
          event.preventDefault()
          const extraData: any = {}
          // Use ajaxSubmit provided by jquery.form — call on jQuery-wrapped element
          const $form = (this && (window as any).jQuery) ? (window as any).jQuery(this) : null
          if ($form && (typeof $form.ajaxSubmit === 'function')) {
            $form.ajaxSubmit({
              data: extraData,
              dataType: 'jsonp',
              error: function () {
                // Google Forms does not support JSONP; treat error as success
                setShowModal(true)
              },
            })
          } else {
            // Fallback: submit normally which will navigate away — still posts to Google Forms
            (this as HTMLFormElement).submit()
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
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Let’s work together
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Share a few details and I’ll get back within 1–2 business days.
          </p>
        </div>

        {/* Google Form - DO NOT CHANGE IDs, names or endpoint */}
        <form
          action="https://docs.google.com/forms/d/e/1FAIpQLScq2CuXrBqHINVPEukIoZu5U3Y9lSwnN9PR30oRFhhvDUrSKA/formResponse"
          target="_self"
          id="bootstrapForm"
          method="POST"
        >
          <fieldset>
            <h2 className="sr-only">Contact Form on Portfolio Website</h2>
          </fieldset>

          <fieldset>
            <legend htmlFor="39647405">Name</legend>
            <div className="form-group">
              <input id="952164786" type="text" name="entry.952164786" className="form-control w-full px-4 py-3 rounded-lg border" required />
            </div>
          </fieldset>

          <fieldset>
            <legend htmlFor="1168891388">Email</legend>
            <div className="form-group">
              <input id="134509771" type="text" name="entry.134509771" className="form-control w-full px-4 py-3 rounded-lg border" required />
            </div>
          </fieldset>

          <fieldset>
            <legend htmlFor="1206902817">Phone (Optional)</legend>
            <div className="form-group">
              <input id="1157405561" type="text" name="entry.1157405561" className="form-control w-full px-4 py-3 rounded-lg border" />
            </div>
          </fieldset>

          <fieldset>
            <legend htmlFor="1334432677">Organization / Company (Optional)</legend>
            <div className="form-group">
              <input id="1097748670" type="text" name="entry.1097748670" className="form-control w-full px-4 py-3 rounded-lg border" />
            </div>
          </fieldset>

          <fieldset>
            <legend htmlFor="600812440">Subject</legend>
            <div className="form-group">
              <input id="844904308" type="text" name="entry.844904308" className="form-control w-full px-4 py-3 rounded-lg border" />
            </div>
          </fieldset>

          <fieldset>
            <legend htmlFor="2082728613">Message</legend>
            <div className="form-group">
              <textarea id="1411447157" name="entry.1411447157" className="form-control w-full px-4 py-3 rounded-lg border" />
            </div>
          </fieldset>

          <input type="hidden" name="fvv" value="1" />
          <input type="hidden" name="fbzx" value="5145165369736482462" />
          <input type="hidden" name="pageHistory" value="0" />

          <div className="mt-6">
            <input className="btn btn-primary bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-3 rounded-lg" type="submit" value="Submit" />
          </div>
        </form>

        {/* Modal shown after successful submission (or when JSONP fails) */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-black/50" onClick={() => setShowModal(false)} />
            <div className="relative bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg p-8 max-w-md w-full shadow-lg">
              <h3 className="text-lg font-semibold mb-2">Message sent</h3>
              <p className="mb-4">Thanks — your message has been submitted. I will get back to you shortly.</p>
              <div className="text-right">
                <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded">
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
