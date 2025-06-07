<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function send(Request $request)
    {
        $validated = $request->validate([
            'name'    => 'required|string|max:255',
            'email'   => 'required|email',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        // إرسال الإيميل
        // ContactController.php
        Mail::send('emails.contact', [
            'name' => $validated['name'],
            'email' => $validated['email'],
            'subject' => $validated['subject'],
            'user_message' => $validated['message'], // تغيير الاسم هنا
        ], function ($message) use ($validated) {
            $message->to('emadhashash76@gmail.com')
                ->subject($validated['subject']);
            $message->replyTo($validated['email'], $validated['name']);
        });

        return redirect()->back()->with('success', ' ');
    }
}
