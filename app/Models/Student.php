<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'student_id',
        'department',
        'year',
        'semester',
    ];

    /**
     * Get the user that owns the student profile.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
